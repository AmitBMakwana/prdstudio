<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubscriptionTransaction extends Model
{
    protected $fillable = [
        'transaction_id',
        'user_id',
        'plan_name',
        'amount_inr',
        'credits_added',
        'status',
        'payment_method',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
