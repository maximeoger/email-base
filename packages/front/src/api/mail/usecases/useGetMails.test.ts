import { renderHook } from "@testing-library/react";
import { useGetMails } from "../useGetMails";
import { useInjection } from "../../../core/service";
import { useQuery } from "@tanstack/react-query";

jest.mock("../../../core/service");
jest.mock("@tanstack/react-query");

describe("useGetMails", () => {
  const mockGetMails = jest.fn();

  beforeEach(() => {
    (useInjection as jest.Mock).mockReturnValue({ getMails: mockGetMails });
    jest.clearAllMocks();
  });

  it("devrait retourner les mails avec succès", () => {
    const mockData = {
      results: [
        { id: 1, subject: "Test Mail 1" },
        { id: 2, subject: "Test Mail 2" },
      ],
    };

    (useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    const { result } = renderHook(() => useGetMails(0));

    expect(result.current.mails).toEqual(mockData.results);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
  });

  it("devrait gérer l'état de chargement", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    });

    const { result } = renderHook(() => useGetMails(0));

    expect(result.current.mails).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe("");
  });

  it("devrait gérer les erreurs", () => {
    const errorMessage = "Failed to fetch mails";
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: { message: errorMessage },
      isLoading: false,
    });

    const { result } = renderHook(() => useGetMails(0));

    expect(result.current.mails).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });
});
