import google.generativeai as genai
from google.colab import auth  # Only needed in Google Colab

# Set up your API key
GOOGLE_API_KEY = 'YOUR_API_KEY_HERE'  # Replace with your actual API key
genai.configure(api_key=GOOGLE_API_KEY)

# Create a generative model instance
model = genai.GenerativeModel('gemini-pro')

def chatbot_response(user_input):
    """Generate a response from the chatbot based on user input."""
    response = model.generate_content(user_input)
    return response.text

# Example interaction loop
if __name__ == "__main__":
    print("Chatbot: Hello! I am a Gemini chatbot. Type 'exit' to end the chat.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            print("Chatbot: Goodbye!")
            break
        response = chatbot_response(user_input)
        print(f"Chatbot: {response}")
