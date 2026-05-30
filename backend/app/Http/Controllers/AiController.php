<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI;
use GuzzleHttp\Client;

class AiController extends Controller
{
    public function generate(Request $request)
    {
        $request->validate([
            'prompt' => 'required|string|max:200',
        ]);

        $client = OpenAI::factory()
            ->withApiKey(config('services.openai.api_key'))
            ->withHttpClient(new Client([
                'verify' => false,
            ]))
            ->make();

        $response = $client->chat()->create([
            'model' => 'gpt-4o-mini',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'Generate a short paragraph of maximum 3-4 lines about the given topic. Be direct and concise. Do not use titles or special formatting.',
                ],
                [
                    'role' => 'user',
                    'content' => $request->prompt,
                ],
            ],
            'max_tokens' => 200,
            'temperature' => 0.7,
        ]);

        $content = $response->choices[0]->message->content;

        return response()->json([
            'content' => trim($content),
        ]);
    }
}
