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
 * @interface MarketCapDto
 */
export interface MarketCapDto {
    /**
     * Token name
     * @type {string}
     * @memberof MarketCapDto
     */
    tokenName: string;
    /**
     * Token address
     * @type {string}
     * @memberof MarketCapDto
     */
    tokenAddress: string;
    /**
     * Calculated market cap
     * @type {number}
     * @memberof MarketCapDto
     */
    marketCap: number;
}

/**
 * Check if a given object implements the MarketCapDto interface.
 */
export function instanceOfMarketCapDto(value: object): value is MarketCapDto {
    if (!('tokenName' in value) || value['tokenName'] === undefined) return false;
    if (!('tokenAddress' in value) || value['tokenAddress'] === undefined) return false;
    if (!('marketCap' in value) || value['marketCap'] === undefined) return false;
    return true;
}

export function MarketCapDtoFromJSON(json: any): MarketCapDto {
    return MarketCapDtoFromJSONTyped(json);
}

export function MarketCapDtoFromJSONTyped(json: any): MarketCapDto {
    if (json == null) {
        return json;
    }
    return {
        
        'tokenName': json['tokenName'],
        'tokenAddress': json['tokenAddress'],
        'marketCap': json['marketCap'],
    };
}

export function MarketCapDtoToJSON(value?: MarketCapDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'tokenName': value['tokenName'],
        'tokenAddress': value['tokenAddress'],
        'marketCap': value['marketCap'],
    };
}

