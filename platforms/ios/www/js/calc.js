/**
 * Created by gengzhengtao on 2016/9/3.
 */
jQuery(document).ready(function(){

    var validationbuttion = function(){


        var itemDescA = jQuery("#itemDescA").val();
        var itemDescB = jQuery("#itemDescB").val();
        var taxTypeA = jQuery("#taxTypeA").val();
        var taxTypeB = jQuery("#taxTypeB").val();
        var isTaxA = jQuery("#isTaxA").val();
        var isTaxB = jQuery("#isTaxB").val();
        var taxA = jQuery("#taxA").val();
        var taxB = jQuery("#taxB").val();
        var priceA = jQuery("#priceA").val();
        var priceB = jQuery("#priceB").val();

        if(itemDescA != "clean" && itemDescB != "clean" && taxTypeA !="clean" && taxTypeB != "clean" && isTaxA != "clean"
            && isTaxB != "clean" && taxA != "clean" && taxB != "clean" && priceA != "" && priceB != "" ){
            $('[type="button"]').button('enable');
            //$('[type="button"]').button('refresh');
        }else{
            $('[type="button"]').button('disable');
        }

    }

    jQuery("#priceA").blur(function(){
        validationbuttion();
    });

    jQuery("#priceB").blur(function(){
        validationbuttion();
    });

    jQuery("#pageoneA").click(function(){
        jQuery.mobile.changePage( "#pageone" );
    });
    jQuery("#pageoneB").click(function(){
        jQuery.mobile.changePage( "#pagetwo" );

    });

    jQuery("#pagetwoB").click(function(){
        jQuery.mobile.changePage( "#pagetwo" );

    });

    jQuery("#pagetwoA").click(function(){
        jQuery.mobile.changePage( "#pageone" );

    });


    jQuery("#itemDescA").change(function () {
        jQuery("#supplier").val("");
        jQuery("#supplierPrice").val("");
        jQuery("#otherPrice").val("");
        jQuery("#otherPriceTax").val("");
        jQuery("#itemDescB").val(jQuery("#itemDescA").val());
        if(jQuery("#itemDescA").val() == 2){
            jQuery("#taxTypeA").val(0)
            jQuery("#taxTypeB").val(0)
        }
        $('select').selectmenu('refresh', true);
        validationbuttion();
    });

    jQuery("#itemDescB").change(function () {
        jQuery("#supplier").val("");
        jQuery("#supplierPrice").val("");
        jQuery("#otherPrice").val("");
        jQuery("#otherPriceTax").val("");
        jQuery("#itemDescA").val(jQuery("#itemDescB").val());
        if(jQuery("#itemDescB").val() == 2 ){
            jQuery("#taxTypeA").val(0)
            jQuery("#taxTypeB").val(0)
        }
        $('select').selectmenu('refresh', true);
        validationbuttion();
    });

    jQuery("#isTaxA").change(function () {
        jQuery("#supplier").val("");
        jQuery("#supplierPrice").val("");
        jQuery("#otherPrice").val("");
        jQuery("#otherPriceTax").val("");
        validationbuttion();
    });


    jQuery("#isTaxB").change(function () {
        jQuery("#supplier").val("");
        jQuery("#supplierPrice").val("");
        jQuery("#otherPrice").val("");
        jQuery("#otherPriceTax").val("");
        validationbuttion();
    });

    jQuery("#taxB").change(function () {
        jQuery("#supplier").val("");
        jQuery("#supplierPrice").val("");
        jQuery("#otherPrice").val("");
        jQuery("#otherPriceTax").val("");
        validationbuttion();
    });

    jQuery("#taxA").change(function () {
        jQuery("#supplier").val("");
        jQuery("#supplierPrice").val("");
        jQuery("#otherPrice").val("");
        jQuery("#otherPriceTax").val("");
        validationbuttion();
    });

    jQuery("#taxTypeA").change(function () {
        jQuery("#supplier").val("");
        jQuery("#supplierPrice").val("");
        jQuery("#otherPrice").val("");
        jQuery("#otherPriceTax").val("");
        if(jQuery("#itemDescA").val() == 2 ){
            if(jQuery("#taxTypeA").val() == 1){
                alert("视同销售下只可开具专用发票");
            }
            jQuery("#taxTypeA").val(0)
            jQuery("#taxTypeB").val(0)
            $('select').selectmenu('refresh', true);
        }
        validationbuttion();
    });

    jQuery("#taxTypeB").change(function () {

        jQuery("#supplier").val("");
        jQuery("#supplierPrice").val("");
        jQuery("#otherPrice").val("");
        jQuery("#otherPriceTax").val("");
        if(jQuery("#itemDescB").val() == 2 ){
            if(jQuery("#taxTypeB").val() == 1){
                alert("视同销售下只可开具专用发票");
            }
            jQuery("#taxTypeA").val(0)
            jQuery("#taxTypeB").val(0)
            $('select').selectmenu('refresh', true);
        }
        validationbuttion();
    });

    jQuery("#calcone").click(function(){
        var itemDescA = jQuery("#itemDescA").val();
        var itemDescB = jQuery("#itemDescB").val();
        var taxTypeA = jQuery("#taxTypeA").val();
        var taxTypeB = jQuery("#taxTypeB").val();
        var isTaxA = jQuery("#isTaxA").val();
        var isTaxB = jQuery("#isTaxB").val();
        var taxA = jQuery("#taxA").val();
        var taxB = jQuery("#taxB").val();
        var priceA = jQuery("#priceA").val();
        var priceB = jQuery("#priceB").val();
        var costA = 0.00;
        var costB = 0.00;

        if(itemDescA == "clean" || itemDescB == "clean" || taxTypeA =="clean" || taxTypeB == "clean" || isTaxA == "clean"
            || isTaxB == "clean" || taxA == "clean" || taxB == "clean" | priceA == "" || priceB == "" ){
            jQuery("#supplier").val("");
            jQuery("#supplierPrice").val("");
            jQuery("#otherPrice").val("");
            jQuery("#otherPriceTax").val("");
            alert("存在未输入或选择的值");
            return;
        }


        if(isTaxA == 0){
            if(taxTypeA == 0 && itemDescA == 0){
                costA = priceA/(1+taxA/100)*(1-taxA/100*0.12);
            }else{
                costA = priceA;
            }

        }else{
            if(taxTypeA ==0 && itemDescA ==0){
                costA = priceA - priceA*taxA/100*0.12;
            }else{
                costA = priceA * (1+taxA/100);
            }
        }

        if(isTaxB == 0){
            if(taxTypeB == 0 && itemDescA == 0){
                costB = priceB/(1+taxB/100)*(1-taxB/100*0.12);
            }else{
                costB = priceB;
            }

        }else{
            if(taxTypeB ==0 && itemDescA ==0){
                costB = priceB - priceB*taxB/100*0.12;
            }else{
                costB = priceB * (1+taxB/100);
            }
        }

        if(costA > costB){
            if(parseInt(costB) != costB){
                costB = costB.toFixed(2)
            }
            jQuery("#supplier").val("B");
            jQuery("#supplierPrice").val(priceB);
            if(itemDescA == 0 && taxTypeA == 0 ){
                jQuery("#otherPriceTax").val((costB *(1+taxA/100)/(1-taxA/100*0.12)).toFixed(2));
            }else{
                jQuery("#otherPriceTax").val(costB);
            }
            if(itemDescA == 0 && taxTypeA == 0){
                jQuery("#otherPrice").val((costB/(1-taxA/100*0.12)).toFixed(2));
            }else{
                jQuery("#otherPrice").val((costB/(1+taxA/100)).toFixed(2));
            }
        }else if(costA < costB){
            if(parseInt(costA) != costA){
                costA = costA.toFixed(2)
            }
            jQuery("#supplier").val("A");
            jQuery("#supplierPrice").val(priceA);
            if(itemDescA == 0 && taxTypeB == 0 ){
                jQuery("#otherPriceTax").val((costA *(1+taxB/100)/(1-taxB/100*0.12)).toFixed(2));
            }else{
                jQuery("#otherPriceTax").val(costA);
            }
            if(itemDescA == 0 && taxTypeB == 0){
                jQuery("#otherPrice").val((costA/(1-taxB/100*0.12)).toFixed(2));
            }else{
                jQuery("#otherPrice").val((costA/(1+taxB/100)).toFixed(2));
            }
        }else {
            jQuery("#supplier").val("等价");
            jQuery("#supplierPrice").val("等价");
            jQuery("#otherPrice").val("等价");
            jQuery("#otherPriceTax").val("等价");
        }
        jQuery.mobile.changePage( "#pageresult" );
    });



    jQuery("#calctwo").click(function(){
        var itemDescA = jQuery("#itemDescA").val();
        var itemDescB = jQuery("#itemDescB").val();
        var taxTypeA = jQuery("#taxTypeA").val();
        var taxTypeB = jQuery("#taxTypeB").val();
        var isTaxA = jQuery("#isTaxA").val();
        var isTaxB = jQuery("#isTaxB").val();
        var taxA = jQuery("#taxA").val();
        var taxB = jQuery("#taxB").val();
        var priceA = jQuery("#priceA").val();
        var priceB = jQuery("#priceB").val();
        var costA = 0.00;
        var costB = 0.00;

        if(itemDescA == "clean" || itemDescB == "clean" || taxTypeA =="clean" || taxTypeB == "clean" || isTaxA == "clean"
            || isTaxB == "clean" || taxA == "clean" || taxB == "clean" | priceA == "" || priceB == "" ){
            jQuery("#supplier").val("");
            jQuery("#supplierPrice").val("");
            jQuery("#otherPrice").val("");
            jQuery("#otherPriceTax").val("");
            alert("存在未输入或选择的值");
            return;
        }


        if(isTaxA == 0){
            if(taxTypeA == 0 && itemDescA == 0){
                costA = priceA/(1+taxA/100)*(1-taxA/100*0.12);
            }else{
                costA = priceA;
            }

        }else{
            if(taxTypeA ==0 && itemDescA ==0){
                costA = priceA - priceA*taxA/100*0.12;
            }else{
                costA = priceA * (1+taxA/100);
            }
        }

        if(isTaxB == 0){
            if(taxTypeB == 0 && itemDescA == 0){
                costB = priceB/(1+taxB/100)*(1-taxB/100*0.12);
            }else{
                costB = priceB;
            }

        }else{
            if(taxTypeB ==0 && itemDescA ==0){
                costB = priceB - priceB*taxB/100*0.12;
            }else{
                costB = priceB * (1+taxB/100);
            }
        }

        if(costA > costB){
            if(parseInt(costB) != costB){
                costB = costB.toFixed(2)
            }
            jQuery("#supplier").val("B");
            jQuery("#supplierPrice").val(priceB);
            if(itemDescA == 0 && taxTypeA == 0 ){
                jQuery("#otherPriceTax").val((costB *(1+taxA/100)/(1-taxA/100*0.12)).toFixed(2));
            }else{
                jQuery("#otherPriceTax").val(costB);
            }
            if(itemDescA == 0 && taxTypeA == 0){
                jQuery("#otherPrice").val((costB/(1-taxA/100*0.12)).toFixed(2));
            }else{
                jQuery("#otherPrice").val((costB/(1+taxA/100)).toFixed(2));
            }
        }else if(costA < costB){
            if(parseInt(costA) != costA){
                costA = costA.toFixed(2)
            }
            jQuery("#supplier").val("A");
            jQuery("#supplierPrice").val(priceA);
            if(itemDescA == 0 && taxTypeB == 0 ){
                jQuery("#otherPriceTax").val((costA *(1+taxB/100)/(1-taxB/100*0.12)).toFixed(2));
            }else{
                jQuery("#otherPriceTax").val(costA);
            }
            if(itemDescA == 0 && taxTypeB == 0){
                jQuery("#otherPrice").val((costA/(1-taxB/100*0.12)).toFixed(2));
            }else{
                jQuery("#otherPrice").val((costA/(1+taxB/100)).toFixed(2));
            }
        }else {
            jQuery("#supplier").val("等价");
            jQuery("#supplierPrice").val("等价");
            jQuery("#otherPrice").val("等价");
            jQuery("#otherPriceTax").val("等价");
        }

        jQuery.mobile.changePage( "#pageresult" );

    });

});