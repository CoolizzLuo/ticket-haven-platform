export const enum StatusCode {
  SUCCESS = '0000', // 200
  FORBIDDEN = '0001', // 401
  FAIL = '0002', // 400
  NOT_FOUND = '0003', // 404
  ACCT_OR_PWD_WRONG = '0004',
  ORDER_EXCEEDS_SEATS_LIMIT = '0005',
  REMAINING_SEATS_INSUFFICIENT = '0006',
  ORDER_CANNOT_MODIFY = '0007',
  ORDER_CANNOT_BE_PAID = '0008',
  SERVER_ERROR = '0009', // 500,
  UNAVAILABLE_REQUEST_PARAMETER = '0010',
  SEATS_AUTO_SELECTION_FAIL = '0011',
  EVENT_NOT_ON_SALE = '0012',
  ORDER_NO_SEATS = '0013',
}