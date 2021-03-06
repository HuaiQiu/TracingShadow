// Copyright 2012 Mean-Tech Ltd. All Right Reserved

pagesPage   = 1;
domainsPage = 1;

function displayPages(){
    pageshtml="<table>";
    var reachTheEnd = true;
    for (ind in pagesvalue){
	if ((parseInt(ind)+1) > (pagesPage-1)*11)
	    pageshtml+='<tr><td width="50%">'+showURL(pageskey[ind])+'</td><td width="50%">'+molutiGenerateValueBar(pagesvalue[ind], pagesvalue[0], 227, "pagesvalue"+ind, pageFilters[pageskey[ind]])+"</td></tr>";
	if ((parseInt(ind)+1)==(pagesPage*11)) {
	    reachTheEnd = false;
	    break;
	}
    }
    pageshtml+="</table>";
    pageshtml+='<center><div ID="pagesNextPrevious">';
    if (pagesPage > 1) pageshtml+='<span ID="pagesPrevious">Previous -- </span> ';
    pageshtml+='<span ID="pagesPageNumber">Page '+pagesPage+'</span>';
    if (!reachTheEnd) pageshtml+=' <span ID="pagesNext"> -- Next</span>';
    pageshtml+='</div></center>';
    pageshtml+='<span ID="sharebutton" class="molutiyellowbox">Edit and Share Browse-List ('+Object.keys(pageskey).length+' items)</span>';
    document.getElementById("pages").innerHTML=pageshtml;
    for (ind in pagesvalue){
	if ((parseInt(ind)+1) > (pagesPage-1)*11){
	    registerOverEvent("pagesvalue"+ind, pagesvalue[ind]+" visits");
	    registerClickEvent("pagesvalue"+ind, pageskey[ind], tooglePageFilter);
	}
	if ((parseInt(ind)+1)==(pagesPage*11)) break;
    }
    if (!reachTheEnd) registerClickEvent("pagesNext", 1, incPagesPage);
    if (pagesPage > 1) registerClickEvent("pagesPrevious", -1, incPagesPage);
    registerClickEvent("sharebutton", 1, molutiShare);
}

function molutiShare(x){    
var params = "urls=";
for (ind in pageskey){
    params+=escape(pageskey[ind])+"_MM__MM_";
}
params+="&titles=";
for (ind in pageskey){
    params+=escape(titles[pageskey[ind]])+"_MM__MM_";
}
var http = new XMLHttpRequest();
http.open("POST", 'http://www.moluti.com/uploadshare.php', true);
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//http.setRequestHeader("Content-length", params.length);
//http.setRequestHeader("Connection", "close");
http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
	goToSharePage(http.responseText);
    }
}
http.send(params);
}

function goToSharePage(shareID){
    window.open("http://www.moluti.com/share.php?id="+shareID);
}


function incPagesPage(x){
    pagesPage += x;
    displayPages();
}

function incDomainsPage(x){
    domainsPage += x;
    displayDomains();
}

function registerClickEvent(elem_name, param, fct){
    document.getElementById(elem_name).onmouseup = function(e) { 
	fct(param);
    };
}

pageFilters = new Array();
domainFilters = new Array();
cloudFilters = new Array();
dateFilters = new Array();
dayFilters = new Array();
hourFilters = new Array();

function toogleCloudFilter(w){
    if (cloudFilters[w]) cloudFilters[w] = undefined;
    else cloudFilters[w] = true;
    buildCharts();
}

function toogleDateFilter(d){
    if (dateFilters[d]) dateFilters[d] = undefined;
    else dateFilters[d] = true;
    buildCharts();
}

function toogleDayFilter(d){
    if (dayFilters[d]) dayFilters[d] = undefined;
    else dayFilters[d] = true;
    buildCharts();
}

function toogleHourFilter(h){
    if (hourFilters[h]) hourFilters[h] = undefined;
    else hourFilters[h] = true;
    buildCharts();
}

function tooglePageFilter(page){
    if (pageFilters[page]) pageFilters[page] = undefined;
    else pageFilters[page] = true;
    buildCharts();
}

function toogleDomainFilter(domain){
    if (domainFilters[domain]) domainFilters[domain] = undefined;
    else domainFilters[domain] = true;
    buildCharts();
}

function registerOverEvent(elem_name, message){
    document.getElementById(elem_name).onmousemove = function(e) { 
	elem = document.getElementById("molutitooltip");
	elem.innerHTML=message;
	elem.style.position="absolute";
	elem.style.left=e.pageX+100+"px";
	elem.style.top=e.pageY-100+"px";
	
	//$("#molutitooltip").css('left','100px')
	//$("#molutitooltip").css('top','100px')
	elem.style.visibility="visible";
    };
    document.getElementById(elem_name).onmouseout = function(e){
	elem = document.getElementById("molutitooltip");
	elem.style.visibility="hidden";
    }
}

function displayDomains(){
    domainshtml="<table>";
    var reachTheEnd = true;
    for (ind in domainsvalue){
	if ((parseInt(ind)+1) > (domainsPage-1)*12)
	    domainshtml+='<tr><td width="50%">'+domainskey[ind]+'</td><td width="50%">'+molutiGenerateValueBar(domainsvalue[ind], domainsvalue[0], 227, "domainsvalue"+ind, domainFilters[domainskey[ind]])+"</td></tr>";
	if ((parseInt(ind)+1)==(domainsPage*12)) {
	    reachTheEnd = false;
	    break;
	}
    }
    domainshtml+="</table>";
    domainshtml+='<center><div ID="domainsNextPrevious">';
    if (domainsPage > 1) domainshtml+='<span ID="domainsPrevious">Previous -- </span> ';
    domainshtml+='<span ID="domainsPageNumber">Page '+domainsPage+'</span>';
    if (!reachTheEnd) domainshtml+=' <span ID="domainsNext"> -- Next</span>';
    domainshtml+='</div></center>';
    document.getElementById("domains").innerHTML=domainshtml;
    for (ind in domainsvalue){
	if ((parseInt(ind)+1) > (domainsPage-1)*12){
	    registerOverEvent("domainsvalue"+ind, domainsvalue[ind]+" visits");
	    registerClickEvent("domainsvalue"+ind, domainskey[ind], toogleDomainFilter);
	}
	if ((parseInt(ind)+1)==(domainsPage*12)) break;
    }
    if (!reachTheEnd) registerClickEvent("domainsNext", 1, incDomainsPage);
    if (domainsPage > 1) registerClickEvent("domainsPrevious", -1, incDomainsPage);
}

function displayDates(){
    var ddates = new Array();
    var today = new Date().getTime();
    var curday = today-(50*24*60*60*1000);
    for (var i = 0; i <= 50; i++){
	var date = extractDate(curday);
	if (dates[date]) ddates[date] = dates[date]; else ddates[date] = 0;	
	curday = curday + 24*60*60*1000;
    }
    molutiShowBarChartH("dates", ddates, {'width': 970, 'height':100, "xlabelevery":2, "message": datesMessage, "select":toogleDateFilter, "filters":dateFilters});    
}

function datesMessage(date, value){
    return value+" visits on "+date;
}

function molutiGenerateValueBar(value, max, max_width, elem_name, selected){
    var bw = value*max_width/max;
    var ec = "molutibar molutivaluebar";
    if (selected) ec = "molutibar molutivaluebar selected";
    return '<div style="width: '+bw+'px;" class="'+ec+'" ID="'+elem_name+'"></div>';
}

function showURL(url){
    var t = titles[url];
    if (t.length>23) t = t.substring(0,20)+"...";
    return t+' <span class="smalllink">(<a target="_blank" href="'+url+'" title="'+titles[url]+'">view</a>)</span>';
}


function molutiShowBarChartH(elem_name, data, options){
    var max = 0;
    var size = 0;
    for(d in data){
	if (data[d] > max) max = data[d];
	size++;
    }
    elem=document.getElementById(elem_name);
    var chartarea = '<div ID="'+elem_name+'_chartarea" class="molutichartarea" style="width: '+options.width+'px; height: '+(options.height)+'">';
    chartarea += '<table><tr style="background-color: FFC;">';
    var cah = options.height-20;
    var cw  = (options.width/size)-3-2;
    var dcount = 0;
    for (d in data){	
	var h = (data[d]/max)*cah;
	var bc = "molutibar";
	if (options.filters && options.filters[d]) bc += " selected";
	chartarea += '<td style="margin: 0px 0px 0px 0px; background-color: FFC;" valign="bottom"><div ID="molutibar_'+elem_name+'_'+dcount+'" class="'+bc+'" style="margin: 0px 0px 0px 0px; width: '+cw+'px; height: '+h+'px;">&nbsp;</div></td>';
	dcount++;
    }
    chartarea += "</tr><tr>";
    var xevery = 1;
    if (options.xlabelevery) xevery = options.xlabelevery;
    var count = 0;
    for (d in data){	
	chartarea +='<td style="margin: 0px 0px 0px 0px"><div style="margin: 0px 0px 0px 0px; width: '+cw+'px;" class="molutibottomlabel" ID="'+elem_name+'_bottomlabel_'+d+'">';
	if (count % xevery == 0) chartarea += d;
	chartarea += '</div></td>';
	count++;
    }
    chartarea += "</tr>";
    chartarea += '</div>';
    elem.innerHTML = '<div ID="'+elem_name+'_chart" class="molutichart" style="width: '+options.width+'px ;height: '+options.height+'px;">'+
	chartarea+'</div>';    
    if (options.message){
	var dcount=0;
        for (d in data){	
	    registerOverEvent('molutibar_'+elem_name+'_'+dcount, options.message(d, data[d]));
	    dcount++;
	}
    }
    if (options.select){
	var dcount=0;
        for (d in data){	
    	    registerClickEvent('molutibar_'+elem_name+'_'+dcount, d, options.select);
	    dcount++;
	}
    }

}

function displayDays(){
    var ddays = new Array();
    if (days['Mon']) ddays['Mon'] = days['Mon']; else ddays['Mon'] = 0;
    if (days['Tue']) ddays['Tue'] = days['Tue']; else ddays['Tue'] = 0;
    if (days['Wed']) ddays['Wed'] = days['Wed']; else ddays['Wed'] = 0;
    if (days['Thu']) ddays['Thu'] = days['Thu']; else ddays['Thu'] = 0;
    if (days['Fri']) ddays['Fri'] = days['Fri']; else ddays['Fri'] = 0;
    if (days['Sat']) ddays['Sat'] = days['Sat']; else ddays['Sat'] = 0;
    if (days['Sun']) ddays['Sun'] = days['Fri']; else ddays['Sun'] = 0;
    molutiShowBarChartH("days", ddays, {'width': 455, 'height':138, "message":dayMessage, "select":toogleDayFilter, "filters":dayFilters});    
}

function displayHours(){
    var dhours = new Array();
    for (i = 0; i <= 23; i++){
	if (hours[i]) dhours[i] = hours[i]; else dhours[i] = 0;
    }
    molutiShowBarChartH("hours", dhours, {'width': 460, 'height':138, "xlabelevery":1, "message":hourMessage, "select":toogleHourFilter, "filters":hourFilters});    
}

function hourMessage(hour, value){
    return value+" visits between "+hour+":00 and "+hour+":59";
}

function dayMessage(day, value){
    if (day=="Mon") return value+" visits on Mondays"
    if (day=="Tue") return value+" visits on Tuesdays";
    if (day=="Wed") return value+" visits on Wednesdays";
    if (day=="Thu") return value+" visits on Thursdays";
    if (day=="Fri") return value+" visits on Fridays";
    if (day=="Sat") return value+" visits on Saturdays";
    return value+" visits on Sundays";

}

function displayCloud(){
    wordshtml='<div class="moluticloud">';
    var limit = 120;
    if (limit > wordsvalue.length) limit = wordsvalue.length;
    var max = wordsvalue[0];
    var min = wordsvalue[limit-1];
    var aa = new Array();
    for (var i =0; i < limit && i < wordskey.length; i++){
	if (wordskey[i].length<=3){
	    limit++;
	}
	else {	    
	    var cclass = 5;
	    if (min!=max)cclass = ((wordsvalue[i]-min))*10/(max-min);	  
	    cclass = Math.floor(cclass);
	    if (cclass == 10) cclass = 9;
	    aa[i] = wordskey[i]+'_'+cclass;
	}
    }
    aa = aa.sort();
    for (var i = 0; i < aa.length; i++){
	var wc = "moluticloudword"+aa[i].substring(aa[i].length-1);
	if (cloudFilters[aa[i].substring(0,aa[i].length-2)]) wc += " textselected";
	wordshtml += '<span ID="moluticloudword_'+aa[i].substring(0,aa[i].length-2)+'" class="'+wc+'">'+aa[i].substring(0,aa[i].length-2)+'</span> ';
    }
    wordshtml += "</div>";
    document.getElementById("cloud").innerHTML=wordshtml;
    for (var i =0; i < limit && i < wordskey.length; i++){
	registerOverEvent("moluticloudword_"+wordskey[i], wordsvalue[i]+" visits to pages containing "+wordskey[i]);
	registerClickEvent("moluticloudword_"+wordskey[i], wordskey[i], toogleCloudFilter);
    }    
}
