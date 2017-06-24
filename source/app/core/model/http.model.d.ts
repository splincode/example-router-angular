import {Http, Response, URLSearchParams, Headers} from "@angular/http";

/**
 * Обертка над стандартным классом Http
 *
 * ### Example
 *
 * ```typescript
 * import {HttpBase} from 'HttBase';
 * class DataService extends HttpBase {
 *   constructor() {
 *
 *   }
 * }
 *
 */
export declare class HttpBase {

    constructor(protected http: Http);

    /**
     * URI адрес приложения
     * Пример: http://localhost:8282/context/
     */
    public location: string;

    /**
     * Объект, хранящий запросы, которые требуют повторной отправки в силу обрыва соединения
     * Пример: { "http://localhost:8282/context/api/state-get": 2, .. }
     */
    private replayStack: Object;

    /**
     * Выполнение http запросов
     * @param type -  тип http-запроса
     * @param url - URI запроса
     * @param params - параметры запроса
     * @param cache - включен ли кеш
     *
     * Пример: this.httpRequest("GET", "/api/execute-list", {pageSize: 5}, false);
     *
     */
    public httpRequest(type: string, url: string, params: Map<string, string[]>, cache: boolean);

    /**
     * Установка http заголовков
     */
    private setHeaders(): Headers;

    /**
     * Очистка тела запроса от пустых значений (null|undefined)
     * @param args - параметры запроса
     * @param cache - включен ли кеш
     *
     * Пример: this.validateSearchParams({a: 1, b: 2, c: null, d: 4, e: undefined}, false);
     * Result -> {a: 1, b: 2, d: 4, time: 1495746217599}
     *
     */
    private validateSearchParams(args = {}, cache: boolean = true): URLSearchParams;

    /**
     * Подготовка тела запроса в зависимости от типа (GET|POST)
     * @param type -  тип http-запроса
     * @param params - параметры запроса
     */
    private paramsChange(type: string, params: URLSearchParams): any;

    /**
     * Требуется ли повторный запрос для данного URI
     * @param url - URI запроса
     */
    private needReplayRequest(url);

    /**
     * Удаление из стека повторных запросов отработанный URL
     * @param url - URI запроса
     */
    private clearReplayRequest(url);

    /**
     * Получение времени (хеш) для сброса кеша
     * Пример: this.getTime(); // "1495746217599"
     */
    private getTime(): string;

    /**
     * Обработка http ответа на запрос
     * @param res - результат запроса
     */
    protected extractDataJSON(res: Response);

    /**
     * Обработчик ошибок http запросов
     * @param error - ошибка
     */
    protected handleError(error: Response | any);

    /**
     * Механизм обработки ошибки на оборвавшийся запрос
     * @param error - ошибка
     * @param requestObject - объект запроса
     */
    protected handleErrorBadRequest(error: Response, requestObject);

}
