import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Simple rule-based responses for demo (in production, use AI SDK)
    let response = "I understand you're seeking medical advice. "

    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("fever") || lowerMessage.includes("temperature")) {
      response +=
        "For fever, make sure to stay hydrated, rest, and monitor your temperature. If it exceeds 103°F (39.4°C) or persists for more than 3 days, please consult a healthcare provider."
    } else if (lowerMessage.includes("headache") || lowerMessage.includes("migraine")) {
      response +=
        "For headaches, try resting in a quiet, dark room, staying hydrated, and using over-the-counter pain relief if needed. If headaches are severe, frequent, or accompanied by other symptoms, please see a doctor."
    } else if (lowerMessage.includes("cough") || lowerMessage.includes("cold")) {
      response +=
        "For cough and cold symptoms, rest, drink plenty of fluids, and consider using a humidifier. Over-the-counter medications can help manage symptoms. If symptoms worsen or persist beyond 10 days, consult a healthcare provider."
    } else if (lowerMessage.includes("stomach") || lowerMessage.includes("nausea")) {
      response +=
        "For stomach issues, try eating bland foods (BRAT diet: bananas, rice, applesauce, toast), stay hydrated with small sips of water, and rest. If symptoms are severe or include blood, seek immediate medical attention."
    } else {
      response +=
        "I recommend consulting with a healthcare provider for a proper diagnosis. In the meantime, make sure to rest, stay hydrated, and monitor your symptoms. If you experience severe or worsening symptoms, please seek immediate medical attention."
    }

    response += "\n\n⚠️ Please note: This is general information and not a substitute for professional medical advice."

    return NextResponse.json({ response })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
