import { PRDDocument, UserProfile, WizardState } from '../types/prd';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export async function fetchUserFromLaravel(): Promise<UserProfile | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`);
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'success' && data.user) {
        return {
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone || 'Not Provided',
          joinedDate: 'August 16, 2026',
          verified: data.user.verified ?? true,
          avatarLetter: data.user.avatar_letter || 'A',
          plan: data.user.plan || 'Free',
          creditsRemaining: data.user.credits_remaining ?? 50,
          creditsMax: data.user.credits_max ?? 50,
          planValidity: data.user.plan_validity || 'September 15, 2026'
        };
      }
    }
  } catch (e) {
    console.log('Laravel Backend API offline, using local state client fallback.');
  }
  return null;
}

export async function fetchPRDsFromLaravel(): Promise<PRDDocument[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/prds`);
    if (res.ok) {
      const result = await res.json();
      if (result.status === 'success' && Array.isArray(result.data)) {
        return result.data.map((item: any) => ({
          id: item.prd_id || item.id,
          title: item.title,
          createdAt: new Date(item.created_at || Date.now()).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
          updatedAt: new Date(item.updated_at || Date.now()).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
          wizardState: item.wizard_state_json,
          platformName: item.platform_name,
          techTags: item.tech_tags_json || [],
          sections: item.sections_json || [],
          masterPrompt: item.master_prompt || ''
        }));
      }
    }
  } catch (e) {
    console.log('Laravel API backend offline, loading local state.');
  }
  return null;
}

export async function generatePRDInLaravel(wizardState: WizardState): Promise<PRDDocument | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/prds/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(wizardState)
    });
    if (res.ok) {
      const result = await res.json();
      if (result.status === 'success' && result.data) {
        const item = result.data;
        return {
          id: item.prd_id || item.id,
          title: item.title,
          createdAt: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
          updatedAt: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
          wizardState: item.wizard_state_json,
          platformName: item.platform_name,
          techTags: item.tech_tags_json || [],
          sections: item.sections_json || [],
          masterPrompt: item.master_prompt || ''
        };
      }
    }
  } catch (e) {
    console.log('Laravel backend offline, generating locally.');
  }
  return null;
}
