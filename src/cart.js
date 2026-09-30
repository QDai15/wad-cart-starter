// Implement cartTotal here. See README.md for the specification.
export function cartTotal(items, options) {
  // 1. Xử lý giỏ hàng rỗng
  if (!items || items.length === 0) {
    return 0;
  }

  let subtotal = 0;

  // 2. Tính subtotal và kiểm tra điều kiện lỗi
  for (const item of items) {
    if (item.price < 0) {
      throw new RangeError('Price cannot be negative');
    }
    // Số lượng phải là số nguyên dương
    if (!Number.isInteger(item.qty) || item.qty <= 0) {
      throw new RangeError('Quantity must be a positive integer');
    }
    
    subtotal += item.price * item.qty;
  }

  // 3. Tính thuế VAT và phí vận chuyển
  const vat = subtotal * options.vatRate;
  const shipping = subtotal >= options.freeShipFrom ? 0 : options.shipFee;

  // 4. Tính tổng và làm tròn thành số nguyên (whole đồng)
  const total = subtotal + vat + shipping;
  
  return Math.round(total);
}