const dateFormatter = (date:string) => {
    let d = new Date(date);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${da}-${mo}`;
  };
  
  export default dateFormatter;