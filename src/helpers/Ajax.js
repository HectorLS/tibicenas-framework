
class Ajax {
  constructor() {}

  get(url, successCallback) {
    return new Promise((resolve, reject) => {

      const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

      xhr.open('GET', url);
  		xhr.onreadystatechange = () => {
  			if (xhr.readyState > 3 && xhr.status === 200) {
          if (!!successCallback) successCallback(xhr.responseText);
  			} else if (xhr.readyState < 3 && xhr.status !== 200) {
          console.error('Get request error: ' + xhr.status);
        }
  		};

  		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  		xhr.send();

  		return xhr;
    });
  }


  post(url, data, successCallback, contentType = 'application/x-www-form-urlencoded', responseType = 'json') {
    const params = typeof data == 'string' ? data : Object.keys(data).map((k) => {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
    }).join('&');

		const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

		xhr.open('POST', url);
		xhr.onreadystatechange = () => {
			if (xhr.readyState > 3 && xhr.status === 200) {
        if (!!successCallback) successCallback(xhr);
			} else if (xhr.readyState < 3 && xhr.status !== 200) {
        console.error('Post request error: ' + xhr.status);
      }
		};
    // The header X-Requested-With allows server side frameworks
    // (such Rails,Django etc.) to identify Ajax requests
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', contentType);
    xhr.responseType = responseType; //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
		xhr.send(params);

		return xhr;
  }


  getCORS(url, successCallback) {
    let xhr = new XMLHttpRequest();
    if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9

    xhr.open('GET', url);
    xhr.onload = successCallback;
    xhr.send();
    return xhr;
  }
}


export default Ajax;
