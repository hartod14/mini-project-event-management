export function formatCurrency(amount: number): string {
    const toNumber = Number(amount)
    return `Rp ${toNumber.toLocaleString("id-ID")}`;
}