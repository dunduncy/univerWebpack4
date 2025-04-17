

export default function getDefaultRoute(routes){
  var redirect = '';
  if(routes&&routes.length>0){
      redirect+=routes[0].resourceRoute
    if(routes[0].childList&&routes[0].childList.length>0){
      redirect+=routes[0].childList[0].resourceRoute
    }
  }
  return redirect
}
