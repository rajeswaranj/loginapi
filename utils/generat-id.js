exports.generateJobId=() =>{
    const prefix = "JD";
    const randomNumber = Math.floor(100 + Math.random() * 900); // Generate a 3-digit number
    return `${prefix}${randomNumber}`;
  }
   