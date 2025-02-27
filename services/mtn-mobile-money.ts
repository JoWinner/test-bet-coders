// Mock MTN Mobile Money API service

interface CollectionResponse {
  status: "success" | "failure"
  transactionId: string
}

interface DisbursementResponse {
  status: "success" | "failure"
  transactionId: string
}

export const mtnMobileMoney = {
  initiateCollection: async (phoneNumber: string, amount: number): Promise<CollectionResponse> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate success with 80% probability
    const isSuccess = Math.random() < 0.8

    if (isSuccess) {
      return {
        status: "success",
        transactionId: `COL-${Math.random().toString(36).substr(2, 9)}`,
      }
    } else {
      throw new Error("Collection failed")
    }
  },

  initiateDisbursement: async (phoneNumber: string, amount: number): Promise<DisbursementResponse> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate success with 90% probability
    const isSuccess = Math.random() < 0.9

    if (isSuccess) {
      return {
        status: "success",
        transactionId: `DIS-${Math.random().toString(36).substr(2, 9)}`,
      }
    } else {
      throw new Error("Disbursement failed")
    }
  },
}

