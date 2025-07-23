# mud

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.14. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## OpenAI Integration

1. **Set your OpenAI API key**

   - Create a `.env` file in the project root (if not already present).
   - Add the following line:
     ```
     OPENAI_API_KEY=sk-...
     ```

2. **AI Chat Endpoint**

   - POST `/connection/ai`
   - Body: `{ "message": "your message here" }`
   - Returns: `{ "response": "AI's response" }`

3. **Note:**
   - The endpoint currently uses a placeholder user_id. Update this to use the actual authenticated user's ID as needed.
