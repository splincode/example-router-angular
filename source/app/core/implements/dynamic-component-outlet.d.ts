import {Type} from "@angular/core";

/**
 * Объект, который хранит ссылки на компоненты
 */
export interface DynamicComponentsList {
    [key: string]: Type<any>;
}

/**
 * Компонент, занимающийся рендерингом динамических компонентов
 * @componentsList {DynamicComponentsList} - объект со ссылками на динамические компоненты
 * @getClass {Function} - получение компонента по ссылке
 */
export interface DynamicComponentOutlet {
    componentsList: DynamicComponentsList;
    getClass(className): void;
}