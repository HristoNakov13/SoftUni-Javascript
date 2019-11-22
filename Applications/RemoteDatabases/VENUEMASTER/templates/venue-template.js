export const VENUE_TEMPLATE =
    "    <span class=\"venue-name\"><input class=\"info\" type=\"button\" value=\"More info\"></span>\n" +
    "    <div class=\"venue-details\" style=\"display: none;\">\n" +
    "        <table>\n" +
    "            <tr>\n" +
    "                <th>Ticket Price</th>\n" +
    "                <th>Quantity</th>\n" +
    "                <th></th>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td class=\"venue-price\">{venue.price} lv</td>\n" +
    "                <td><select class=\"quantity\">\n" +
    "                        <option value=\"1\">1</option>\n" +
    "                        <option value=\"2\">2</option>\n" +
    "                        <option value=\"3\">3</option>\n" +
    "                        <option value=\"4\">4</option>\n" +
    "                        <option value=\"5\">5</option>\n" +
    "                    </select></td>\n" +
    "                <td><input class=\"purchase\" type=\"button\" value=\"Purchase\"></td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "        <span class=\"head\">Venue description:</span>\n" +
    "        <p class=\"description\">{venue.description}</p>\n" +
    "        <p class=\"description\">Starting time: {venue.startingHour}</p>\n" +
    "    </div>";