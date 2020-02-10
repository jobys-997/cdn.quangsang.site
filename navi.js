function showpageCount(json) {
    var thisUrl = location.href;
    var htmlMap = new Array();
    var isFirstPage = thisUrl.substring(thisUrl.length-14,thisUrl.length)==".blogspot.com/";
    var isLablePage = thisUrl.indexOf("/search/label/")!=-1;
    var isPage = thisUrl.indexOf("/search?updated")!=-1;
    var thisLable = isLablePage ? thisUrl.substr(thisUrl.indexOf("/search/label/")+14,thisUrl.length) : "";
    thisLable = thisLable.indexOf("?")!=-1 ? thisLable.substr(0,thisLable.indexOf("?")) : thisLable;
    var thisNum = 1;
    var postNum=1;
    var itemCount = 0;
    var fFlag = 0;
    var eFlag = 0;
    var html= '';
    var upPageHtml ='';
    var downPageHtml ='';
    var pageCount=2;
    var displayPageNum=5;
    var firstPageWord = 'First';
    var endPageWord = 'Last';
    var upPageWord ='<';
    var downPageWord ='>';
    var labelHtml = '<span class="showpageNum"><a href="/search/label/'+thisLable+'?&max-results='+pageCount+'">';
    for(var i=0, post; post = json.feed.entry[i]; i++) {
    var timestamp = post.published.$t.substr(0,10);
    var title = post.title.$t;
    if(isLablePage){
    if(title!=''){
    if(post.category){
    for(var c=0, post_category; post_category = post.category[c]; c++) {
    if(encodeURIComponent(post_category.term)==thisLable){
    if(itemCount==0 || (itemCount % pageCount ==(pageCount-1))){
    if(thisUrl.indexOf(timestamp)!=-1 ){
    thisNum = postNum;
    }
    postNum++;
    htmlMap[htmlMap.length] = '/search/label/'+thisLable+'?updated-max='+timestamp+'T00%3A00%3A00%2B08%3A00&max-results='+pageCount;
    }
    }
    }
    }//end if(post.category){
    itemCount++;
    }
    }else{
    if(title!=''){
    if(itemCount==0 || (itemCount % pageCount ==(pageCount-1))){
    if(thisUrl.indexOf(timestamp)!=-1 ){
    thisNum = postNum;
    }
    if(title!='') postNum++;
    htmlMap[htmlMap.length] = '/search?updated-max='+timestamp+'T00%3A00%3A00%2B08%3A00&max-results='+pageCount;
    }
    }
    itemCount++;
    }
    }
    for(var p =0;p< htmlMap.length;p++){
    if(p>=(thisNum-displayPageNum-1) && p<(thisNum+displayPageNum)){
    if(fFlag ==0 && p == thisNum-2){
    if(thisNum==2){
    if(isLablePage){
    upPageHtml = labelHtml + upPageWord + '</a></span>';
    }else{
    upPageHtml = '<span class="showpage"><a href="/">' + upPageWord + '</a></span>';
    }
    }else{
    upPageHtml = '<span class="showpage"><a href="'+htmlMap[p]+'">' + upPageWord + '</a></span>';
    }
    fFlag++;
    }
    if(p==(thisNum-1)){
    html += '<span class="showpagePoint">'+ thisNum+ '</span>';
    }else{
    if(p==0){
    if(isLablePage){
    html = labelHtml+'1</a></span>';
    }else{
    html += '<span class="showpageNum"><a href="/">1</a></span>';
    }
    }else{
    html += '<span class="showpageNum"><a href="'+htmlMap[p]+'">'+ (p+1) +'</a></span>';
    }
    }
    if(eFlag ==0 && p == thisNum){
    downPageHtml = '<span class="showpage"><a href="'+htmlMap[p]+'">' + downPageWord + '</a></span>';
    eFlag++;
    }
    }//end if(p>=(thisNum-displayPageNum-1) && p<(thisNum+displayPageNum)){
    }//end for(var p =0;p< htmlMap.length;p++){
    if(thisNum>1){
    if(!isLablePage){
    html = '<span class="showpage"><a href="#">' + firstPageWord + ' </a></span>' + upPageHtml + html;
    }else{
    html = labelHtml + firstPageWord + ' </a></span>' + upPageHtml + html;
    }
    }
    html = '<div class="showpageArea">'+html;
    if(thisNum<(postNum-1)){
    html += downPageHtml;
    html += '<span class="showpage"><a href="' + htmlMap[htmlMap.length-1] + '">'+ endPageWord + '</a></span>';
    }
    if(postNum==1) postNum++;
    html += '</div>';
    if(isPage || isFirstPage || isLablePage){
    var pageArea = document.getElementsByName("pageArea");
    var blogPager = document.getElementById("blog-pager");
    if(postNum <= 2){
    html ='';
    }
    for(var p =0;p< pageArea.length;p++){
    pageArea[p].innerHTML = html;
    }
    if(pageArea&&pageArea.length>0){
    html ='';
    }
    if(blogPager){
    blogPager.innerHTML = html;
    }
    }
    }
    <script src="/feeds/posts/summary?alt=json-in-script&callback=showpageCount&max-results=99999" type="text/javascript"></script>
