import { http, HttpResponse } from "msw";
import { API_URL } from "../constants";

export const handlers = [
  http.get(`${API_URL}/statistics`, () =>
    HttpResponse.json({
      totalRecipients: 100,
      totalEmailsSent: 1000,
      totalUnsubscribes: 10,
    })
  ),

  http.get(`${API_URL}/unsubscribes`, () =>
    HttpResponse.json([
      {
        date: "2024-01-01",
        count: 5,
      },
      {
        date: "2024-01-02",
        count: 10,
      },
      {
        date: "2024-01-03",
        count: 15,
      },
      {
        date: "2024-01-04",
        count: 20,
      },
      {
        date: "2024-01-05",
        count: 25,
      },
      {
        date: "2024-01-06",
        count: 10,
      },
      {
        date: "2024-01-07",
        count: 5,
      },
      {
        date: "2024-01-08",
        count: 20,
      },
    ])
  ),

  http.get(`${API_URL}/newsletters`, () =>
    HttpResponse.json([
      {
        id: "1",
        file: "newsletter-1.pdf",
        name: "Newsletter 1",
        scheduledAt: "2024-01-01T12:00:00.000Z",
        recipients: [
          {
            email: "test@email.com",
          },
          {
            email: "test2@email.com",
          },
        ],
      },
      {
        id: "2",
        file: "newsletter-2.png",
        name: "Newsletter 2",
        recipients: [
          {
            email: "test@email.com",
          },
        ],
      },
      {
        id: "3",
        file: "newsletter-3.pdf",
        name: "Newsletter 3",
        scheduledAt: "2024-01-01T12:00:00.000Z",
        recipients: [],
      },
    ])
  ),

  http.get(`${API_URL}/newsletters/:id`, () =>
    HttpResponse.json({
      id: "1",
      file: "newsletter-1.pdf",
      name: "Newsletter 1",
      scheduledAt: "2024-01-01T12:00:00.000Z",
      recipients: [
        {
          email: "test@email.com",
        },
        {
          email: "test2@email.com",
        },
      ],
    })
  ),
];
