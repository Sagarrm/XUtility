function CountryStateCityCtnl($scope) {
            $scope.countries = {
				'/xWalker':{
				},
				
                '/Women': {
                    'Accessories': {'Handbags':['Cross-Body Handbags','Hobo Handbags','Satchels','Shoulder Bags','Tote Handbags','Clutches & Special Occasion Bags','Bucket Bags','BackPacks'],'Jewelry':['Bracelets,Charms & Pendants','Cufflinks','Earrings','Necklaces','Diamonds','Rings'],'Watches':[],'Belt Buckles':[],'Belts':[],'Gloves & Mittens':[],'Hair Accessories':[],'Hats':[],'Scarves & Shawls':[],'Sunglasses':[]},
                    'Clothing': {'Activewear':['Active Dresses','Active Jackets','Active Pants','Active Shirts','Active Shorts','Active Skirts','Active Tanks','Sweatshirts','Sports Bra'],'Dresses':['Day Dresses','Formal Dresses','Cocktail Dresses','Jumpsuits & Rompers','Casual Dresses'], 'Outerwear':['Coats & Jackets','Capes & Ponchos','Casual Jackets','Puffers','Trench Coats','Raincoats'],'Pants':['Casual Pants','Dress Pants','Leggings'],'Jeans':[],'Shirts & Tops':['Camisoles & Tank Tops','Polo Shirts','Shirts & Blouses','Sweaters & Cardigans','T-Shirts'],'Shorts':[],'Skirts':[],'Sleepwear & Loungewear':['Nightgowns','Pajamas','Robes'],'Swimwear':['Cover-Ups','One-Piece Swimsuits','Swimsuit Bottoms','Swimsuit Tops','Two-Piece Swimsuits'],'Bras & Panties':['Bras','Lingerie','Shapewear','Underwear'],'Hosiery and Socks':[]},
                    'Shoes': {'Shoe Accessories':[], 'Athletic Shoes':['Cross Training Shoes','Running Shoes'], 'Clogs & Mules':[],'Flats':[],'Loafers':[],'Outdoor Shoes':[],'Oxford Shoes':[],'Pumps':['D\'orsay & Two-Piece Pumps'],'sandals':['slide-sandals','thongs-flip-flops'],'Slippers':[],'Sneakers':[],'Booties':[],'Outdoor Sandals':[],'boots':[],'Wedges':[],'Platform Sandals':[]}
                },
                '/Baby & Toddler': {
                    'Baby Bathing': {},
                    'Baby Health': {},
                    'Baby Safety': {'Baby Monitors':[]},
					'Baby Toys':{'Playmats':[]},
					'Baby Transport':{'Baby & Toddler Car Seats':[],'Baby Stroller':[]},
					'Baby Transport Accessories':{'Baby & Toddler Car Seat Accessories':[],'Baby Carrier Accessories':[],'Baby Stroller Accessories':[],'Shopping Cart & High Chair Covers':[]},
					'Diapering':{'Changing Mats':[]},
					'Nursing & Feeding':{'Baby & Toddler Bibs':[],'Baby Food':[],'Baby Bottles':[]},
					'Baby & Toddler Clothing':{'Baby & Toddler Bottoms':[],'Baby & Toddler Dresses':[],'Baby & Toddler Outerwear':[],'Baby & Toddler Outfits':[],'Baby & Toddler Socks & Tights':[],'Baby & Toddler Swimwear':[],'Baby & Toddler Tops':[],'Baby Onesies':[],'Baby Sleepwear & Swaddlers':[]}
                },
                '/Computer': {
                    'Computer Accessories': {'Laptop Accessories':[]},
                    'Handheld Devices': {'E-Book Readers':[]},
					'Laptops':{},
					'Tablet Computers':{},
					'Chargers':{},
					'Power Adapters':{},
					'Print, Copy, Scan & Fax/Printers & Copiers':{}
                },
				'/Electronics':{
					'Audio':{'Headphones':[],'MP3 Players':[]},
					'Communications':{'Mobile Phone Accessories':[],'Mobile Phones':[],'Satellite Phones':[]},
					'Electronics Accessories':{}
					
				},
				'/Furniture':{
					'Baby & Toddler Furniture':{'Bassinets':[],'Changing Tables':[],'High Chairs & Boosters':[],'Beds, Cribs & Cradles':[]},
					'Bedroom Furniture':{'Armoires':[],'Bed Frames':[],'Dressers':[],'Headboards & Footboards':[],'Nightstands':[],'Storage Chests':[]},
					'Benches':{},
					'Chairs':{'Bar Stools':[],'Chaises':[],'Club Chairs':[],'Kitchen & Dining Room Chairs':[],'Living Room Chairs':[]},
					'Desks & Tables':{'Desks':[],'Kitchen & Dining Room Tables':[],'Living Room Tables':[]},
					'Kitchen & Dining Room Furniture':{'Buffets & Sideboards':[]},
					'Living Room Furniture':{'Ottomans':[]},
					'Outdoor Furniture':{},
					'Shelving':{'Bookcases':[]},
					'Sofas':{'Loveseats':[],'Sofabeds':[]},
					'Vanities':{'Bathroom Vanities':[]},
					'Wine Racks & Cellars':{'Wine Coolers':[]}
				},
				'/Health & Beauty':{
					'Jewelry Cleaning & Care':{'Jewelry Boxes':[],'Jewelry Cleaners':[]},
					'Cosmetics':{'Bath & Body':{},'Cosmetic Tools':{},'Makeup':{},'Nail Care':{},'Perfume & Cologne':{},'Skin Care':{}},
					'Hair Care':{'Combs & Brushes':{},'Hair Curler Clips & Pins':{},'Hair Curlers':{},'Hair Dryers':{},'Hair Irons':{},'Hair Shears':{},'Shampoo & Conditioner':{},'Styling Gel, Spray & Mousse':{}},
					'Oral Care':{},
					'Shaving & Grooming':{'Aftershave':{},'Razors & Razor Blades':{},'Shaving Brushes':{},'Shaving Cream':{}},
					'Sleeping Aids':{'Sleep Masks':{},'Travel Pillows':{},'White Noise Machines':{}},
					'Vision Care':{'Eye Glasses':{}}
				},
				'/Toys & Games':{
					'Games':{'Card Games':[]},
					'Outdoor Play Equipment':{},
					'Puzzles':{},
					'Toys':{'Art & Drawing Toys':[],'Educational Toys':[],'Electronic Toys':[],'Dolls, Playsets & Toy Figures':[]}
				},
				'/Sporting Goods':{
					'Outdoor Recreation':{'Golf':[],'Cycling':[],'Fishing':[],'Camping, Backpacking & Hiking':[]},
					'Water Sports':{'Swimming':[]},
					'Exercise & Fitness':{},
					'Racquet Sports':{}
				},
				'/Home & Garden':{
					'Bathroom Accessories':{'Bath Mats & Rugs':[]},
					'Decor':{'Baskets':[],'Bird Feeders':[],'Birdhouses':[],'Bookends':[],'Candle Holders':[],'Candles':[],'Clocks':[],'Decorative Plates':[],'Figurines':[],'Home Fragrances':[],'Mirrors':[],'Picture Frames':[],'Rugs':[],'Seasonal & Holiday Decorations':[],'Seating & Sofa Cushions':[],'Shadow Boxes':[],'Slipcovers':[],'Throw Pillows':[],'Vases':[],'Weather Vanes & Roof Decor':[],'Wind Chimes':[]},
					'Fire & Gas Safety':{'Fire Alarms':[]},
					'Fireplaces & Wood Stoves':{'Fireplace Tools':[]},
					'Household Appliances':{},
					'Household Supplies':{'Household Cleaning Supplies':[],'Household Paper Products':[],'Shoe Care & Tools':[],'Storage & Organization':[]},
					'Lawn & Garden':{'Gardening':[],'Outdoor Living':[]},
					'Lighting':{'Lighting/Lamps':[]},
					'Lighting Accessories':{'Lamp Shades':[]},
					'Linens':{'Bedding':[],'Table Linens':[],'Towels':[]}
				},
				'/Media':{
					'Books':{'Fiction':[],'Non-Fiction':[],'Art Books':[],'Cooking Books':[],'Children\'s Books':[]}	
				},
				'/Software':{
					'Computer Software':{},
					'Video Game Software':{}
				},
				'/Office Supplies':{
					'Filing & Organization':{'Calendars, Organizers & Planners':[]},
					'General Supplies':{},
					'Office Equipment':{}
				},
				'/Men':{
					'Accessories':{'Neckties':['Ascot Ties'],'Pocket Squares':[],'Watches':[],'Belts':[],'Hats':[],'Gloves':[],'Sunglasses':[],'Jewelry':['Cufflinks'],'Bowties':[],'Cufflinks':[],'Scarfs':[]},
					'Clothing':{'Outerwear':['Coats & Jackets','Raincoats','Vests'],'Blazers':[],'Suits':['Pant Suits','Tuxedos','Suit Separates'],'Activewear':['Active Jackets','Active Pants','Active Shirts','Active Shorts','Active Tanks'],'Pants':[],'Jeans':[],'Shirts':[],'T-Shirts':[],'Sweaters':[],'Shorts':[],'Sleepwear & Loungewear':[],'Swimwear':['Swim Shorts'],'Traditional & Ceremonial Clothing':[],'Underwear & Socks':[],'Polo Shirts':[]},
					'Shoes':{'Boots':[],'Athletic Shoes':[],'Loafers':[],'Sandals':['Thongs & Flip-Flops'],'Slippers':[],'Sneakers':[],'Outdoor Shoes':[],'Oxford Shoes':[],'Outdoor Sandals':[],'Flip Flops':[],'Driving Shoes':[]}
				},
				'/Kitchen & Dining':{
					'Bakeware':{},
					'Bakeware Accessories':{},
					'Barware':{},
					'Cookware':{},
					'Cookware Accessories':{},
					'Food & Beverage Carriers':{},
					'Food Storage':{},
					'Kitchen Appliance Accessories':{},
					'Kitchen Appliances':{},
					'Kitchen Tools & Utensils':{},
					'Tableware':{}
				},
				'/Hardware':{
					'Flooring':{'Carpets':[]},
					'Tools':{}
				},
				'/Luggage & Bags':{
				},
				'/Eightylegs unmapped category':{
				},
				'/Kids':{
					'Girls':{'Accessories':[],'Clothing':[]},
					'Boys':{'Accessories':[],'Clothing':[]}
				},
				'/Gifts':{
				},
				'/Pets':{
					'Dogs':{}
				}
            };
             $scope.GetSelectedCountry = function () {
                $scope.strCountry = document.getElementById("country").value;
            };
            $scope.GetSelectedState = function () {
                $scope.strState = document.getElementById("state").value;
            };
			 $scope.GetSelectedCity = function () {
                $scope.strCity = document.getElementById("city").value;
            };
			
        }