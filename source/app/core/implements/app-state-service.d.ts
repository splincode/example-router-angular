import {Observable} from "rxjs/Observable";

/**
 * Хранения состояния приложения
 * @appLayouts {Array<any>} - хранение рабочих столов
 * @localization {Object} - текст приложения
 * @initialSumComponent {number} - сумма компонентов инициализрованных
 * @taskCount {number} - количество задач в процессах
 * @observableInterval {Observable} - испольнение функции, в случае успеха запроса
 */
export type InternalStateType = {
    appLayouts: Array<any>;
    localization: Object;
    initialSumComponent: number;
    taskCount: number;
    observableInterval: Observable<any>;
}