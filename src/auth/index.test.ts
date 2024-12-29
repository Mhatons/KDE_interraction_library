import KDEAuth from "./index"

describe("Authentication Module", () => {
  let auth: KDEAuth

  test("should throw an error if initialized without a valid cookie", () => {
    const testURL = "http://example.com"
    expect(() => new KDEAuth(testURL)).toThrow(
      "Authentication cookie is missing."
    )
  })

  test("should throw an error if no authentication cookie is present in URL", () => {
    const testURL = "http://example.com"
    expect(() => new KDEAuth(testURL)).toThrow(
      "Authentication cookie is missing."
    )
  })

  test("should confirm unauthenticated state when the document has no auth cookie", () => {
    jest.spyOn(document, "cookie", "get").mockReturnValue("")
    expect(KDEAuth.isAuthenticated()).toBe(false)
  })

  test("should confirm authenticated state when the document has a valid auth cookie", () => {
    jest.spyOn(document, "cookie", "get").mockReturnValue("auth=abc123")
    expect(KDEAuth.isAuthenticated()).toBe(true)
  })

  test("should correctly handle an edge case of malformed URLs", () => {
    const malformedURL = "http://example.com?invalidParam"
    expect(() => new KDEAuth(malformedURL)).toThrow(
      "Authentication cookie is missing."
    )
  })
})
