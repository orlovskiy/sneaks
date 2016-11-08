/*$('#letter1').animate({'right':'10px'},500,function(){
	$('#letter2').animate({'right':'10px'},500,function(){
		$('#letter3').animate({'right':'10px'},500,function(){
			$('#letter4').animate({'right':'10px'},500,function(){
				$('#letter5').animate({'right':'10px'},500,function(){
					$('#letter6').animate({'right':'10px'},500,function(){
						$('#letter7').animate({'right':'10px'},500,function(){
							$('#letter8').animate({'right':'10px'},500,function(){
								console.log('^^')})
						})
					})
				})
			})
		})
	})
})

*/




function sortBy(parameter){

}





function sneakIn(elems,direction,amount,speed,ease){
	(speed =='undefined')? //if speed dont passed it should be 'fast'
	speed= '\'fast\'':(typeof speed =='number')?//speed can be Number or string
	speed = speed : speed = '\''+speed+'\'';

	(typeof amount=='number')?
	amount = '\'' + amount + 'px\'' : amount = amount;

	(ease!='undefined')?
	ease = '' : ease = ',\''+ease+'\',';	//passing easing is optional
	var command = '$(\'#'+elems[0].id+'\').animate({\''+direction+'\':\''+amount+'\'},'+speed+''+ease+',function(){'
		var cap = '})';
for (var i = 1; i<elems.length; i++){
	command +='$(\'#'+elems[i].id+'\').animate({\''+direction+'\':\''+amount+'\'},'+speed+''+ease+',function(){'
		cap += '})';
}
command+='console.log(\'^^\')'
command+=cap;
eval(command)
}


function sneakOut(elems,direction,amount,speed,ease){
		(speed =='undefined')? //if speed dont passed it should be 'fast'
		speed= '\'fast\'':(typeof speed =='number')?//speed can be Number or string
		speed = speed : speed = '\''+speed+'\'';
		
		(typeof amount=='number')?
		amoun = '\'' + amount + 'px\'': amount = amount;

		(ease!='undefined')?
		ease = '' : ease = ',\''+ease+'\',';	//passing easing is optional
		var command = '$(\'#'+elems[elems.length-1].id+'\').animate({\''+direction+'\':\''+amount+'\'},'+speed+''+ease+',function(){'
			var cap = '})';
	for (var i = elems.length-2; i>=0; i--){
		command +='$(\'#'+elems[i].id+'\').animate({\''+direction+'\':\''+amount+'\'},'+speed+''+ease+',function(){'
			cap += '})';
	}
	command+='console.log(\'success^_^\')'
	command+=cap;
	eval(command)
}

var loaded_data = {};
function hideItems(){
	for(var i = 0; i<document.getElementById('items').childNodes.length;i++){
		document.getElementById('items').childNodes[i].className = 'itemView hide';
	}
}


function clearItems(){ 
	while(document.getElementById('items').firstChild){
		document.getElementById('items').removeChild(document.getElementById('items').firstChild);
	}
}



function makeRequest(){
		var data = { 
			table : $('input[name=itemType]:checked')[0].value,
			name : $('#itemName')[0].value,
			/*size : $('#sizes')[0].value,*/
			/*sortBy : $('#sortBy')[0].value,*/
			key :'rtt', 
			gen :'json'
		};

		var request = $.ajax({ 
			url: "http://idealliance.ru/port.php", 
			method: "GET", 
			data: data,
			dataType: "json"
		}); 

		request.done(function( msg ) {
			
			var data_collection = {
				price1:$('input[name=price1]').val(),
				price2:$('input[name=price2]').val(),
				itemSex:$('input[name=itemSex]:checked').val(),
				itemType:$('input[name=itemType]:checked').val(),
				itemName:$('input[name=itemName]').val().substr(1),
				itemSize:$('#sizes').val()
			}

			loaded_data = data_collection;

			var itemView = document.createElement('div');
			itemView.className += 'itemView';
			var itemName = document.createElement('span');
			itemName.className = "itemName";
			itemView.appendChild(itemName);

			var itemSubName = document.createElement('span');
			itemSubName.className = "itemSubName";
			itemView.appendChild(itemSubName);

			var itemPrice = document.createElement('span');
			itemPrice.className = "itemPrice";
			itemView.appendChild(itemPrice);

			var itemPriceBG = document.createElement('div')
			itemPriceBG.className = 'itemPriceBG';
			itemView.appendChild(itemPriceBG);

			var itemPicContainer = document.createElement('div');
			itemPicContainer.className = "itemPicContainer";

			var itemPic = document.createElement('img');
			itemPic.className = "itemPic";
			itemPicContainer.appendChild(itemPic);

			itemView.appendChild(itemPicContainer);

			var itemSalePrice = document.createElement('span');
			itemSalePrice.className = "itemSalePrice";
			itemView.appendChild(itemSalePrice);

			var badgeSale = document.createElement('span');
			badgeSale.className = "itemBadgeSale";
			itemView.appendChild(badgeSale);

			var itemSex = document.createElement('span');
			itemSex.className = "itemSex";
			itemView.appendChild(itemSex);

			var itemColor = document.createElement('span');
			itemColor.className = "itemColor";
			itemView.appendChild(itemColor);

			var itemSize = document.createElement('span');
			itemSize.className = "itemSize";
			itemView.appendChild(itemSize);

			var itemURL = document.createElement('a');
			/*itemURL.innerHTML = "ссылка";*/
			itemURL.className = "itemURL";
			itemView.appendChild(itemURL);


			var items = document.createDocumentFragment();


			for (var i=0;i<msg.length;i++){
				try{
					var item = JSON.parse(msg[i]);
					var itemViewCopy = itemView.cloneNode(true);
					itemViewCopy.getElementsByClassName('itemName')[0].innerHTML = item.name;
					itemViewCopy.getElementsByClassName('itemSubName')[0].innerHTML = item.subname;
					itemViewCopy.getElementsByClassName('itemPrice')[0].innerHTML = item.price;
					
					itemViewCopy.getElementsByClassName('itemSalePrice')[0].innerHTML = item.saleprice;
					itemViewCopy.getElementsByClassName('itemBadgeSale')[0].innerHTML = item.badgesale;
					itemViewCopy.getElementsByClassName('itemPicContainer')[0].style.height = $(window).height()*0.4*0.9+'px';
					itemViewCopy.getElementsByClassName('itemPic')[0].src = item.imglink;
					itemViewCopy.getElementsByClassName('itemPic')[0].style.height = itemViewCopy.style.width;					
					itemViewCopy.getElementsByClassName('itemURL')[0].href = item.link;
					itemViewCopy.getElementsByClassName('itemColor')[0].innerHTML = item.color;
					itemViewCopy.getElementsByClassName('itemSize')[0].innerHTML = item.size;
					itemViewCopy.getElementsByClassName('itemSex')[0].className += ' itemSex_'+item.pol;


					items.appendChild(itemViewCopy);
					itemViewCopy.className = 'itemView hide';

				}catch(err){console.log(err)}
			}


			loaded_items = items.cloneNode(true);


			try{
				for(var i = 0;i<10;i++){
					items.childNodes[i].className = 'itemView shown';
				}
			}catch(err){
				console.log(err)
			}

			window.onscroll = function(){
				var shown = document.getElementsByClassName('shown').length
				if(window.pageYOffset+window.innerHeight>document.getElementById('items').offsetHeight-100){
					try{
						for(var i = shown; i<shown+10;i++){
							document.getElementById('items').childNodes[i].className = 'itemView shown';
						}
					}catch(err){console.log(err)}
				}
			}
			clearItems();

			updateItems('itemSex','mw',loaded_data,items)
		}); 

		request.fail(function( jqXHR, textStatus ) { 
			alert( "Request failed: " + textStatus ); 
		});
}


function requestNeeded(inputId,value,loaded_data){
	if(inputId.indexOf('price')!=-1){
		if(inputId=='price1'&&value<loaded_data[inputId]){
			return true;
		}else if(inputId=='price2'&&value>loaded_data[inputId]){
			return true;
		}else{
			return false;
		}
	}
	else if(inputId=='itemName'){
		if(loaded_data[inputId]='1'){
			/*console.log('name is empty string')*/
			return false;
		}
		else if(loaded_data[inputId].indexOf(value)){
			return false
		}else{
			return true;
		}
	}
	else if(inputId=='itemSex'){
		if(loaded_data[inputId]==value||loaded_data[inputId]=='mw'){
			return false;
		}else{
			return true;
		}
	}
	else if(inputId == 'itemSortBy'){
		return false
	}
	else if(loaded_data[inputId]!=value){
		return true;
	}else{
		return false;
	}
}


function updateItems(inputId,value,loaded_data,loaded_items){
	var items = document.getElementById('items');
	var data = document.getElementsByClassName('data_to_load');
	var data_collection = {
		price1:$('input[name=price1]').val(),
		price2:$('input[name=price2]').val(),
		itemSex:$('input[name=itemSex]:checked').val(),
		itemType:$('input[name=typeSelect]:checked').val(),
		itemName:$('input[name=itemName]').val().substr(1),
		itemSize:$('#sizes').val(),
		itemSortBy:$('#itemSortBy').val()
	}
	if(requestNeeded(inputId,value,loaded_data)){
		if($('#searchButton').hasClass('hide')){
			$('#searchButton').css('opacity',0).removeClass('hide').animate({'opacity':1},500);
			$('#showForm').animate({'top':$('#searchForm').height()},300);
		}else{
			null
		}
	}else{
		if($('#searchButton').hasClass('hide')){
			null
		}
			else{
				console.log(inputId,value)
				$('#searchButton').animate({'opacity':0},300,function(){$('#searchButton').addClass('hide')});
				$('#showForm').animate({'top':$('#searchForm').height()-$('#searchButton').height()-20},400)
			}
				var sorting = [];
				var updated_items = document.createDocumentFragment();
				for (var i = 0; i<loaded_items.childNodes.length;i++){
						/*console.log(
							loaded_items.childNodes[i].getElementsByClassName('itemPrice')[0].innerHTML>data_collection['price1'],
							loaded_items.childNodes[i].getElementsByClassName('itemPrice')[0].innerHTML<data_collection['price2'],
							loaded_items.childNodes[i].getElementsByClassName('itemName')[0].innerHTML.toLowerCase().indexOf(data_collection['itemName'].toLowerCase())!=-1,
							data_collection['itemSex'].indexOf(loaded_items.childNodes[i].getElementsByClassName('itemSex')[0].className.substr(-2))>-1
							)*/
						if(Number(loaded_items.childNodes[i].getElementsByClassName('itemPrice')[0].innerHTML)>=Number(data_collection['price1'])
							&&Number(loaded_items.childNodes[i].getElementsByClassName('itemPrice')[0].innerHTML)<=Number(data_collection['price2'])
							&&loaded_items.childNodes[i].getElementsByClassName('itemName')[0].innerHTML.toLowerCase().indexOf(data_collection['itemName'].toLowerCase())!=-1
							&&data_collection['itemSex'].indexOf(loaded_items.childNodes[i].getElementsByClassName('itemSex')[0].className.substr(-2).replace('_',''))>-1
							){
								var matched_item=loaded_items.childNodes[i].cloneNode(true);
								var price = matched_item.getElementsByClassName('itemPrice')[0].innerHTML
								var discount = matched_item.getElementsByClassName('itemBadgeSale')[0].innerHTML
								if(data_collection['itemSortBy']==null){
									updated_items.appendChild(matched_item);
								}else{
									sorting.push({'price':price,'item':matched_item,'discount':discount});
								}
				

							}else{null}
				}

		function comparePrice(a,b){
			return a.price-b.price
		}
	
		function compareDiscount(a,b){
			return a.discount-b.discount
		}
	
		if(data_collection['itemSortBy']==null){
			null
		}
	
		else if(data_collection['itemSortBy']=='priceUp'){
			var sorted = sorting.sort(comparePrice);
			for(var i = 0;i<sorted.length;i++){
				updated_items.appendChild(sorted[i].item);
			}
			clearItems();
		}
	
		else if(data_collection['itemSortBy']=='priceDown'){
			var sorted = sorting.sort(comparePrice);
			for(var i = sorted.length-1;i>=0;i--){
				updated_items.appendChild(sorted[i].item);
			}
			clearItems();
		}
	
		else if(data_collection['itemSortBy']=='discountUp'){
			var sorted = sorting.sort(compareDiscount);
			for(var i = 0;i<sorted.length;i++){
				updated_items.appendChild(sorted[i].item);
			}
			clearItems();
		}
	
		else if(data_collection['itemSortBy']=='discountDown'){
			var sorted = sorting.sort(compareDiscount);
			for(var i = sorted.length-1;i>=0;i--){
				updated_items.appendChild(sorted[i].item);
			}
			clearItems();
		}
	
		try{
			for(var i = 0;i<10;i++){
				updated_items.childNodes[i].className = 'itemView shown';
			}
		}catch(err){console.log(err)}
	
	
		items.appendChild(updated_items);
				
	}	
}





window.onresize = function(){
	/*$('#searchForm *').css('margin-bottom',0);
	var equal_margin = ($(window).height() - $('#searchForm').css('height').slice(0,-2))/Math.floor(($('#searchForm').css('height').slice(0,-2)/$('#searchForm').children().first().css('height').slice(0,-2)));
	$('#searchForm *').css('margin-bottom',equal_margin);
	$('#searchButton').css('margin-bottom','0');*/
}
window.onload = function(){
	$('#logo').css('margin-top',$(window).height()/2.5)
	$('.sneakPiece').css('right','100%');
	var loaded_items = {};
	var equal_margin = ($(window).height() - $('#searchForm').css('height').slice(0,-2))/Math.floor(($('#searchForm').css('height').slice(0,-2)/$('#searchForm').children().first().css('height').slice(0,-2)));
	/*$('#searchForm *').css('margin-bottom',equal_margin);
	$('#searchButton').css('margin-bottom','0');
	*/

	$('#priceRange').slider({
		range:true,
		step:100,
		min:500,
		max:10000,
		values:[2000,7000],
		slide:function(){
			var sliderValues = $('#priceRange').slider('values');
			$('#price1').val(sliderValues[0]);
			$('#price2').val(sliderValues[1]);
		},
		create:function(){
			var sliderHandles = document.getElementsByClassName('ui-slider-handle');
			sliderHandles[0]['inputId']='price1';
			sliderHandles[1]['inputId']='price2';
			var sliderValues = $('#priceRange').slider('values');
			$('#price1').val(sliderValues[0]);
			$('#price2').val(sliderValues[1]);
		}
	});
	$('.ui-slider-handle')[1].style.marginLeft = '-23px';
	var sliderValues = $('#priceRange').slider('values');

	$('#price1').on('change',function(){
		sliderValues[0] = $('price1val').val();
	})

	$('#price2').on('change',function(){
		sliderValues[1] = $('price2val').val();
	})



	$('#searchButton').on('click',function(){
			if($('input[name=itemType]:checked').length=='0'){
		alert('Выберите тип');
			}else{
				makeRequest();
				$('#searchForm')[0].className = 'fixed'; 
			$('#showForm').headroom({
    		// vertical offset in px before element is first unpinned
    		offset : 0,
    		// scroll tolerance in px before state changes
    		tolerance : 45,
    		// or you can specify tolerance individually for up/down scroll
    		tolerance : {
    			up : 45,
    			down : 0
    		},
    		onPin:function(){
    			$('#showForm').css('top',0).removeClass('hide');
    		}
 		 });

			document.getElementById('logo').className = '';
			var items_margin = $(window).height()-$('#logo').height()-Number($('#logo').css('margin-top').replace('px',''));
			$('#items').css('margin-top',items_margin+40);
			$('#searchForm').animate({'top':-$('#searchForm').height()-2},500,function(){
				$('.sneakPiece').animate({'opacity':0},function(){
					$(this).css('right','100%').css('opacity',1);
				});
				sneakOut($('.sneakPiece'),'right',0,120)
			});
			$('#showForm').animate({'top':0},500);

			$('input[name=itemType]').change(function(){
				updateItems(this.name,this.value,loaded_data,loaded_items);
			});

			$('input[name=itemSex]').change(function(){
				updateItems(this.name,this.value,loaded_data,loaded_items);
			});



			$('#priceRange').slider({
				stop:function(event,ui){
					updateItems(ui.handle.inputId,ui.value,loaded_data,loaded_items);
				}
			})



			document.getElementById('itemName').oninput=function(){
				updateItems(this.id,'1'+this.value,loaded_data,loaded_items)
			}
			
			$('#itemSortBy').on('change',function(){
				updateItems(this.id,this.value,loaded_data,loaded_items)
			})

			$('#showForm').on('click',function(){
				if($('#searchForm').css('top')=='0px'){
					$('#searchForm').animate({'top':-$('#searchForm').height()},500);
					$('#showForm').animate({'top':0,'opacity':0},500);
					$('#showForm').headroom({
    				// vertical offset in px before element is first unpinned
    				offset : 0,
    				// scroll tolerance in px before state changes
    				tolerance : 45,
    				// or you can specify tolerance individually for up/down scroll
    				tolerance : {
    					up : 45,
    					down : 0
    				},
    				onPin:function(){
    					$('#showForm').css('top',0).removeClass('hide').animate({'opacity':1},20);
    				}
  				});
				}else{
					$('#searchForm').animate({'top':0},500);
					$('#showForm').animate({'top':$('#searchForm').height()},500)
					$('#showForm').headroom('destroy');
				}
			})
			}
	});

}


