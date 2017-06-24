/**
 * Объект, который передается при инициализации метода в DataService
 * @type {String} - тип http-запроса
 * @url {String} - URI запроса
 * @params {Map} - параметры запроса
 * @cache {Boolean} - включение кеша
 * @success {Function} - испольнение функции, в случае успеха запроса
 * @failed {Function} - испольнение функции, в случае ошибки запроса
 */
export interface DataServiceRequestImpl {
    type?: string;
    url?: string;
    params?:  Map<string, string[]>;
    cache?: boolean;
    success?(response: {}): void;
    failed?(error: any): void;
}