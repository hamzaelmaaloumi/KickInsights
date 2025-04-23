from django.http import JsonResponse
import requests
from django.conf import settings
import json
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def gemini_proxy(request):
    if request.method == 'POST':
        try:
            # Get API key from Django settings
            api_key = 'AIzaSyBkUDulJOk5d-MR5d5BLuSd3yRhSL2n5wo'
            
            # Parse the incoming request data
            data = json.loads(request.body)
            prompt = data.get('prompt')
            
            # Prepare the request payload
            text_prompt = prompt
                
            payload = {
                "contents": [
                    {
                        "parts": [
                            {
                                "text": text_prompt
                            }
                        ]
                    }
                ]
            }
            
            # Make request to Gemini API
            response = requests.post(
                f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}',
                json=payload
            )
            
            # Return the API response
            return JsonResponse(response.json())
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)