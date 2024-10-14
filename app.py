from flask import Flask, request, jsonify, send_from_directory
from flask import Flask, send_from_directory
import discord
import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder='public')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
app = Flask(__name__, static_folder='public')
client = discord.Client()

DISCORD_BOT_TOKEN = os.getenv('DISCORD_BOT_TOKEN')
DISCORD_CHANNEL_ID = int(os.getenv('DISCORD_CHANNEL_ID'))

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    lang = request.json['lang']
    
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    response = loop.run_until_complete(send_to_discord(user_message, lang))
    
    return jsonify({"response": response})

async def send_to_discord(message, lang):
    await client.wait_until_ready()
    channel = client.get_channel(DISCORD_CHANNEL_ID)
    
    prefix = "[Website User]" if lang == 'en' else "[ވެބްސައިޓް ބޭނުންކުރާ ފަރާތް]"
    await channel.send(f"{prefix}: {message}")
    
    try:
        response = await client.wait_for('message', check=lambda m: m.channel == channel and m.author == client.user, timeout=30.0)
        return response.content
    except asyncio.TimeoutError:
        return "Sorry, I couldn't generate a response in time. Please try again later." if lang == 'en' else "މަޢާފުކުރައްވާ، މިވަގުތު އަހަރެންނަށް ޖަވާބެއް ނުދެވޭނެ. އަހަރެންގެ ޤާބިލިއްޔަތު އިތުރަށް ތަރައްޤީ ކުރެވެމުންދަނީ."

@client.event
async def on_ready():
    print(f'{client.user} has connected to Discord!')

def run_discord_bot():
    client.run(DISCORD_BOT_TOKEN)

if __name__ == '__main__':
    import threading
    threading.Thread(target=run_discord_bot, daemon=True).start()
    app.run(debug=True)