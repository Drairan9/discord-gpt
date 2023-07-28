discord-gpt
======
### OpenAI ChatCompletion integration with discord.js

Bot is ready to impersonate a random person or work as a server assistant.
All really depends only on your system prompt in **config.json** [Prompt engineering OpenAI article](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api)

Important
======
* Bot will remember last **5**[^1] messages by default to avoid transporting huge amount of tokens.
* You can setup username mapping in **config.json** to avoid outputs like *"Hello! How can I help you today, CoolUsername1?"*

[^1]: **NOT** ONLY ASSISTANT/USER `any message in chat`

| username      | real_name     | Output      |
| ------------- |:--------------| :-----------|
| user1         | John          | Hello John! |
  
Usage
======
Just mention the bot with your question.
