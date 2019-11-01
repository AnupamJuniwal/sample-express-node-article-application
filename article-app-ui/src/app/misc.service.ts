
export function delay(timeoutMS: number){
  return new Promise( resolve => setTimeout(resolve, timeoutMS) );
}
