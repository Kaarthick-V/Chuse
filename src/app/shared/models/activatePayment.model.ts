export interface ActivatePayment{
    isActivate:boolean,
    imgPath:string,
    paymentInfo:PaymentInfo
}
export interface PaymentInfo{
    key:string,
    value:string
}