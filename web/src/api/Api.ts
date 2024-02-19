/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface StatisticsEntity {
  /** Total number of recipients */
  totalRecipients: number;
  /** Total number of emails sent */
  totalEmailsSent: number;
  /** Total number of unsubscribes */
  totalUnsubscribes: number;
}

export interface UnsubscribesEntity {
  date: string;
  /** Number of unsubscribes */
  count: number;
}

export interface RecipientEntity {
  email: string;
}

export interface NewsletterEntity {
  id: string;
  file: string;
  name: string;
  /** @format date-time */
  scheduledAt?: string | null;
  recipients: RecipientEntity[];
}

export interface CreateNewsletterDto {
  /** The name of the newsletter */
  name: string;
  /** The file key name of s3 */
  file: string;
  /**
   * The recipients email of the newsletter
   * @example ["test@email.com"]
   */
  recipients: string[];
  /** The scheduled date of the newsletter */
  scheduledAt?: string;
}

export interface UpdateNewsletterDto {
  /** The name of the newsletter */
  name: string;
  /** The file key name of s3 */
  file?: string;
  /**
   * The recipients email of the newsletter
   * @example ["test@email.com"]
   */
  recipients: string[];
  /** The scheduled date of the newsletter */
  scheduledAt?: string;
}

export interface NewsletterDto {
  id: string;
  name: string;
  file: string;
  scheduledAt?: string | null;
}

export interface UnsubscribeNewsletterDto {
  /** The id of the recipient that is unsubscribing */
  id: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(
      typeof value === "number" ? value : `${value}`
    )}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key]
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${
        queryString ? `?${queryString}` : ""
      }`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Subscribify API
 * @version 1.0
 * @contact
 *
 * Subscribify API endpoints docs
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  statistics = {
    /**
     * No description
     *
     * @name GetStatistics
     * @summary Get general stats
     * @request GET:/statistics
     */
    getStatistics: (params: RequestParams = {}) =>
      this.request<StatisticsEntity, any>({
        path: `/statistics`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  unsubscribes = {
    /**
     * No description
     *
     * @name GetUnsubscribes
     * @summary Get number of unsubscribes of the last 30 days
     * @request GET:/unsubscribes
     */
    getUnsubscribes: (params: RequestParams = {}) =>
      this.request<UnsubscribesEntity[], any>({
        path: `/unsubscribes`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  newsletters = {
    /**
     * No description
     *
     * @name FindAll
     * @summary Get all newsletters
     * @request GET:/newsletters
     */
    findAll: (params: RequestParams = {}) =>
      this.request<NewsletterEntity[], any>({
        path: `/newsletters`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Create
     * @summary Create a newsletter
     * @request POST:/newsletters
     */
    create: (data: CreateNewsletterDto, params: RequestParams = {}) =>
      this.request<NewsletterEntity, any>({
        path: `/newsletters`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name FindOne
     * @summary Get a newsletter
     * @request GET:/newsletters/{id}
     */
    findOne: (id: string, params: RequestParams = {}) =>
      this.request<NewsletterEntity, any>({
        path: `/newsletters/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Update
     * @summary Update a newsletter
     * @request PATCH:/newsletters/{id}
     */
    update: (
      id: string,
      data: UpdateNewsletterDto,
      params: RequestParams = {}
    ) =>
      this.request<NewsletterEntity, any>({
        path: `/newsletters/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Remove
     * @summary Delete a newsletter
     * @request DELETE:/newsletters/{id}
     */
    remove: (id: string, params: RequestParams = {}) =>
      this.request<NewsletterDto, any>({
        path: `/newsletters/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Unsubscribe
     * @summary Unsubscribe the recipient from the newsletter
     * @request POST:/newsletters/{id}/unsubscribe
     */
    unsubscribe: (
      id: string,
      data: UnsubscribeNewsletterDto,
      params: RequestParams = {}
    ) =>
      this.request<NewsletterDto, any>({
        path: `/newsletters/${id}/unsubscribe`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Send
     * @summary Send the newsletter to all recipients
     * @request POST:/newsletters/{id}/send
     */
    send: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/newsletters/${id}/send`,
        method: "POST",
        ...params,
      }),
  };
}
