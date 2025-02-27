import axios from "axios"

const MOMO_HOST = "sandbox.momodeveloper.mtn.com"
const MOMO_TOKEN_URL = `https://${MOMO_HOST}/collection/token/`
const MOMO_REQUEST_TO_PAY_URL = `https://${MOMO_HOST}/collection/v1_0/requesttopay`

let momoToken: string | null = null

export const momoService = {
  getToken: async (apiUserId: string, apiKey: string, subscriptionKey: string): Promise<void> => {
    try {
      const credentials = `${apiUserId}:${apiKey}`
      const encodedCredentials = Buffer.from(credentials).toString("base64")

      const response = await axios.post(
        MOMO_TOKEN_URL,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": subscriptionKey,
            Authorization: `Basic ${encodedCredentials}`,
          },
        },
      )

      momoToken = response.data.access_token
      console.log("MoMo token retrieved successfully")
    } catch (error) {
      console.error("Failed to retrieve MoMo token:", error)
      throw new Error("Failed to retrieve MoMo token")
    }
  },

  requestToPay: async (phoneNumber: string, amount: number, subscriptionKey: string): Promise<string> => {
    try {
      if (!momoToken) {
        throw new Error("MoMo token not available")
      }

      const referenceId = crypto.randomUUID()

      const body = {
        amount: amount.toString(),
        currency: "EUR",
        externalId: Date.now().toString(),
        payer: {
          partyIdType: "MSISDN",
          partyId: phoneNumber,
        },
        payerMessage: "BetCode Subscription Payment",
        payeeNote: "Thank you for subscribing to BetCode",
      }

      const response = await axios.post(MOMO_REQUEST_TO_PAY_URL, body, {
        headers: {
          "X-Reference-Id": referenceId,
          "X-Target-Environment": "sandbox",
          "Ocp-Apim-Subscription-Key": subscriptionKey,
          Authorization: `Bearer ${momoToken}`,
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      })

      if (response.status === 202) {
        return referenceId
      } else {
        throw new Error("Payment request failed")
      }
    } catch (error) {
      console.error("Failed to request payment:", error)
      throw new Error("Failed to request payment")
    }
  },

  checkPaymentStatus: async (referenceId: string, subscriptionKey: string): Promise<string> => {
    try {
      if (!momoToken) {
        throw new Error("MoMo token not available")
      }

      const response = await axios.get(`${MOMO_REQUEST_TO_PAY_URL}/${referenceId}`, {
        headers: {
          "X-Target-Environment": "sandbox",
          "Ocp-Apim-Subscription-Key": subscriptionKey,
          Authorization: `Bearer ${momoToken}`,
        },
      })

      return response.data.status
    } catch (error) {
      console.error("Failed to check payment status:", error)
      throw new Error("Failed to check payment status")
    }
  },
}

