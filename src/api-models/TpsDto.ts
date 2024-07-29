/* tslint:disable */
/* eslint-disable */
/**
 * Vybe Challenge API
 * Vybe Challenge API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * 
 * @export
 * @interface TpsDto
 */
export interface TpsDto {
    /**
     * Transactions per second
     * @type {number}
     * @memberof TpsDto
     */
    tps: number;
    /**
     * Timestamp of the tps metric range end
     * @type {Date}
     * @memberof TpsDto
     */
    ts: Date;
}

/**
 * Check if a given object implements the TpsDto interface.
 */
export function instanceOfTpsDto(value: object): value is TpsDto {
    if (!('tps' in value) || value['tps'] === undefined) return false;
    if (!('ts' in value) || value['ts'] === undefined) return false;
    return true;
}

export function TpsDtoFromJSON(json: any): TpsDto {
    return TpsDtoFromJSONTyped(json);
}

export function TpsDtoFromJSONTyped(json: any): TpsDto {
    if (json == null) {
        return json;
    }
    return {
        
        'tps': json['tps'],
        'ts': (new Date(json['ts'])),
    };
}

export function TpsDtoToJSON(value?: TpsDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'tps': value['tps'],
        'ts': ((value['ts']).toISOString()),
    };
}
