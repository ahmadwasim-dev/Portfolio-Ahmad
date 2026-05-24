export const loadData = () => async (dispatch: any) => {
  try {
    console.log("Starting to load data...")
    dispatch({
      type: "LoadDataRequest",
    })
    
    const response = await fetch("/api/portfolio", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    
    console.log("Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error Response:", errorText)
      
      try {
        const errorData = JSON.parse(errorText)
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to fetch portfolio data`)
      } catch (e) {
        throw new Error(`HTTP ${response.status}: Failed to fetch portfolio data`)
      }
    }

    const jsonresponse = await response.json()
    console.log("API Response:", jsonresponse)
    
    if (!jsonresponse.success) {
      throw new Error(jsonresponse.message || "API returned unsuccessful response")
    }
    
    if (!jsonresponse.data) {
      throw new Error("No data received from API")
    }
    
    // Explicitly convert the fetched data to a plain JavaScript object
    const plainData = JSON.parse(JSON.stringify(jsonresponse.data))
    console.log("Data processed successfully")

    dispatch({
      type: "LoadDataSuccess",
      payload: plainData,
    })
    console.log("Data loaded and dispatched successfully")
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : String(error) || "Unknown error occurred"
    console.error("Error loading data:", errorMessage, error)
    dispatch({
      type: "LoadDataFail",
      payload: errorMessage,
    })
  }
}
