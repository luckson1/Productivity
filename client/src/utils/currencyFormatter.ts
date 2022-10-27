const currencyFormatter = (number:number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: "Ksh" }).format(number)
  };
  
  export default currencyFormatter;