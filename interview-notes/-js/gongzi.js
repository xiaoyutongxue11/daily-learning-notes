function salary(n){
    let sum=0;
    let today=1;
    let i=1;
    while(today<=n){
        if(today+i>n){
            sum+=i*(n-today);
            return sum;
        }else{
            sum+=i*i;
            today+=i;
        }
        i++;
    }
    return sum;
}