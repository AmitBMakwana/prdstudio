<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrdDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'prd_id',
        'user_id',
        'title',
        'platform_name',
        'wizard_state_json',
        'tech_tags_json',
        'sections_json',
        'master_prompt',
        'version',
    ];

    protected $casts = [
        'wizard_state_json' => 'array',
        'tech_tags_json' => 'array',
        'sections_json' => 'array',
        'version' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
