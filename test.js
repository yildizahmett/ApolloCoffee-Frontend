{
	order.length > 0 &&
		order.map(({ id: coffeeId, size, quantity }, idx) => (
			<div key={idx} className='mt-2'>
				<table className='table-auto'>
					<thead>
						<tr>
							<th className='px-4 py-2'>Coffee</th>
							<th className='px-4 py-2'>Size</th>
							<th className='px-4 py-2'>Quantity</th>
							<th className='px-4 py-2'>Price</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className='border px-4 py-2'>{getCoffee(coffeeId).name}</td>
							<td className='border px-4 py-2'>{size}</td>
							<td className='border px-4 py-2'>{quantity}</td>
							<td className='border px-4 py-2'>{getCoffee(coffeeId).price}</td>
						</tr>
					</tbody>
				</table>
			</div>
		));
}
