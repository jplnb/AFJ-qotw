$(async function(){
    // Fetch quote csv file
    let gsheet_response = await fetch("https://docs.google.com/spreadsheets/d/17X0qAvHSblLjCMv6nugW8-He2MmOBQNjZnPD7XLWHu4/export?format=csv");
    
    if(gsheet_response.ok) {
        // Parse csv
        let quote_csv = $.csv.toArrays(await gsheet_response.text());
        
        // Find number of weeks since start and take that mod the number of
        // quotes, subtracting/adding 1 to account for the first line
        let line = (dayjs().diff("2022-05-08","week") % (quote_csv.length-1)) + 1;
        
        // Set quote
        $("#quote").text("\"" + quote_csv[line][1] + "\"");
        $("#quote").css("font-size", "28pt");
        
        // Set author
        $("#author").text("- " + quote_csv[line][2]);
    }
});
