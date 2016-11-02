function replaceSubstring(text, startIndex, endIndex, newSubstring)
{
return text.substring(0, startIndex) + newSubstring + text.substring(endIndex, text.length);
}
function makeCypherEvalString(text)
{
var index;
while ((index = text.indexOf(".")) != -1 && index < text.indexOf("("))
{
text = replaceSubstring(text, index, index + 1, "_");
}
return text;
}
function addTag(tagId, tagType, tagParent)
{
var cypherTag = document.createElement(tagType)
document.getElementById(tagParent).appendChild(cypherTag)
cypherTag.setAttribute("id", tagId)
if (tagType == "canvas")
{
canvasContexts[tagId] = cypherTag.getContext("2d");
}
}
function getTagAttribute(tagId, tagAttributeName)
{
if (tagAttributeName == "value")
{
return document.getElementById(tagId).value;
} else {
return document.getElementById(tagId).getAttribute(tagAttributeName);
}
}
function setTagAttribute(tagId, tagAttributeName, tagAttributeValue)
{
if (tagAttributeName == "value")
{
document.getElementById(tagId).value = tagAttributeValue;
} else {
document.getElementById(tagId).setAttribute(tagAttributeName, tagAttributeValue);
}
}
function getTagChildren(tagId)
{
var tagChildren = document.getElementById(tagId).childNodes;
var cypherOutput = [];
var cypherIndex = 0;
while (cypherIndex < tagChildren.length)
{
cypherOutput[cypherIndex] = tagChildren[cypherIndex].id;
cypherIndex += 1;
}
return cypherOutput;
}
function getArrayKeys(inputArray)
{
var outputKeys = [];
for (key in inputArray)
{
outputKeys[outputKeys.length] = key;
}
return outputKeys;
}
function objectIsInClass(inputObject, inputClass)
{
var objectClass = inputObject[0];
var tempClass = objectClass;
while (tempClass != inputClass)
{
tempClass = classParents[tempClass];
if (tempClass == undefined)
{
return false;
}
}
return true;
}
function getPrivateVariable(inputObject, inputVariableName)
{
var objectClass = inputObject[0];
return eval("get_" + objectClass + "_" + inputVariableName + "(inputObject)");
}
function drawCanvasPolygon(canvasName, coordinateArray)
{
var cypherContext = canvasContexts[canvasName];
cypherContext.beginPath();
cypherContext.moveTo(coordinateArray[0], coordinateArray[1]);
var tempIndex = 2;
while (tempIndex < coordinateArray.length)
{
cypherContext.lineTo(coordinateArray[tempIndex], coordinateArray[tempIndex + 1]);
tempIndex += 2;
}
cypherContext.closePath();
cypherContext.fill();
}
cypherEvent = 0
nextTagId = 0
tagIdStack = ["body"]
tagIdStackIndex = 0
canvasContexts = []
classParents = []
var canvas_width = 250
var canvas_height = 250
var square_size = (canvas_height / 2)
var undefined_color = 21
var color_character_set = ".0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ&@"
document.getElementById("body").style["background"] = "#444444"
addTag("body.div", "div", "body")
document.getElementById("body.div").style["width"] = "700px"
document.getElementById("body.div").style["background"] = "white"
document.getElementById("body.div").style["padding"] = "20px"
document.getElementById("body.div").style["margin-left"] = "auto"
document.getElementById("body.div").style["margin-right"] = "auto"
addTag("left.div", "div", "body.div")
document.getElementById("left.div").style["float"] = "left"
addTag("canvas", "canvas", "left.div")
setTagAttribute("canvas", "width", canvas_width)
setTagAttribute("canvas", "height", canvas_height)
document.getElementById("canvas").style["border"] = "3px black solid"
addTag("right.div", "div", "body.div")
document.getElementById("right.div").style["float"] = "left"
document.getElementById("right.div").style["margin-left"] = "3px"
document.getElementById("right.div").style["border"] = "3px black solid"
document.getElementById("right.div").style["padding"] = "10px"
addTag("get.code.button", "button", "right.div")
document.getElementById("get.code.button").innerHTML = "Get code"
document.getElementById("get.code.button").setAttribute("onclick", "cypherEvent = event; " + "display_world_code" + "()")
addTag("set.code.button", "button", "right.div")
document.getElementById("set.code.button").innerHTML = "Set code"
document.getElementById("set.code.button").setAttribute("onclick", "cypherEvent = event; " + "set_world_from_textbox" + "()")
addTag("a", "br", "right.div")
addTag("world.code", "textarea", "right.div")
setTagAttribute("world.code", "rows", 1)
setTagAttribute("world.code", "cols", 13)
addTag("a", "br", "right.div")
addTag("inventory.title", "strong", "right.div")
document.getElementById("inventory.title").innerHTML = "Inventory  "
addTag("inventory.scroll.left", "button", "right.div")
document.getElementById("inventory.scroll.left").innerHTML = "<"
document.getElementById("inventory.scroll.left").setAttribute("onclick", "cypherEvent = event; " + "scroll_inventory_list" + "('" + -6 + "')")
addTag("inventory.scroll.right", "button", "right.div")
document.getElementById("inventory.scroll.right").innerHTML = ">"
document.getElementById("inventory.scroll.right").setAttribute("onclick", "cypherEvent = event; " + "scroll_inventory_list" + "('" + 6 + "')")
var inventory_div_amount = 6
var inventory_div_count = 0
while((inventory_div_count < inventory_div_amount))
{
var inventory_br_name = "inventory.br." + inventory_div_count
addTag(inventory_br_name, "br", "right.div")
document.getElementById(inventory_br_name).style["clear"] = "both"
var inventory_square_name = "inventory.square." + inventory_div_count
addTag(inventory_square_name, "div", "right.div")
document.getElementById(inventory_square_name).style["float"] = "left"
document.getElementById(inventory_square_name).style["width"] = "15px"
document.getElementById(inventory_square_name).style["height"] = "15px"
document.getElementById(inventory_square_name).style["background"] = "white"
document.getElementById(inventory_square_name).style["margin"] = "4px"
document.getElementById(inventory_square_name).innerHTML = " "
var inventory_div_name = "inventory.div." + inventory_div_count
addTag(inventory_div_name, "div", "right.div")
document.getElementById(inventory_div_name).style["border"] = "3px white solid"
document.getElementById(inventory_div_name).style["float"] = "left"
document.getElementById(inventory_div_name).innerHTML = " "
document.getElementById(inventory_div_name).setAttribute("onclick", "cypherEvent = event; " + "select_inventory_item" + "('" + inventory_div_count + "')")
inventory_div_count += 1
}
addTag("pos.div", "div", "body.div")
document.getElementById("pos.div").style["float"] = "left"
document.getElementById("pos.div").style["margin-left"] = "10px"
document.getElementById("pos.div").innerHTML = "(0, 0, 0)"
addTag("br.one", "br", "body.div")
document.getElementById("br.one").style["clear"] = "both"
addTag("instructions", "p", "body.div")
document.getElementById("instructions").innerHTML = "Use WASDZC to move. Use VFRT to collect blocks and build. To save your work, retrieve a save code and paste it back later."
addTag("end.div", "div", "body")
document.getElementById("end.div").style["width"] = "700px"
document.getElementById("end.div").style["margin-bottom"] = "50px"
document.getElementById("end.div").style["margin-left"] = "auto"
document.getElementById("end.div").style["margin-right"] = "auto"

addTag("return.to.pond.div", "div", "end.div")
document.getElementById("return.to.pond.div").style["background"] = "white"
document.getElementById("return.to.pond.div").style["text-align"] = "center"
document.getElementById("return.to.pond.div").style["width"] = "200px"
document.getElementById("return.to.pond.div").style["margin-left"] = "auto"
document.getElementById("return.to.pond.div").style["padding-left"] = "20px"
document.getElementById("return.to.pond.div").style["padding-right"] = "20px"
document.getElementById("return.to.pond.div").style["padding-bottom"] = "20px"
document.getElementById("return.to.pond.div").style["padding-top"] = "10px"
addTag("return.to.pond.link", "a", "return.to.pond.div")
setTagAttribute("return.to.pond.link", "href", "http://www.ostracodfiles.com/ostracod/main.html")
document.getElementById("return.to.pond.link").innerHTML = "Return to the Ostracod Pond"
document.getElementById("return.to.pond.link").style["color"] = "black"

addTag("return.to.pond.div2", "div", "end.div")
document.getElementById("return.to.pond.div2").style["background"] = "white"
document.getElementById("return.to.pond.div2").style["text-align"] = "center"
document.getElementById("return.to.pond.div2").style["width"] = "200px"
document.getElementById("return.to.pond.div2").style["margin-left"] = "auto"
document.getElementById("return.to.pond.div2").style["padding-left"] = "20px"
document.getElementById("return.to.pond.div2").style["padding-right"] = "20px"
document.getElementById("return.to.pond.div2").style["padding-bottom"] = "20px"
document.getElementById("return.to.pond.div2").style["padding-top"] = "10px"
document.getElementById("return.to.pond.div2").innerHTML = '<a href="https://git123hub.github.io/index/">返回到首页</a>'

function new_color(red, green, blue)
{
return (((red * 16) + (green * 4)) + blue)
}
function get_color_red(color)
{
return parseInt((color / 16))
}
function get_color_green(color)
{
return parseInt(((color % 16) / 4))
}
function get_color_blue(color)
{
return parseInt((color % 4))
}
function set_inventory_item_color(inputObject, privateVarValue)
{
inputObject[1] = privateVarValue;
}
function get_inventory_item_color(inputObject)
{
return inputObject[1];
}
function set_inventory_item_amount(inputObject, privateVarValue)
{
inputObject[2] = privateVarValue;
}
function get_inventory_item_amount(inputObject)
{
return inputObject[2];
}
function new_inventory_item(color, amount)
{
return ["inventory_item", color, amount];
}

var inventory_items = []
var selected_inventory_item_color = -1
var inventory_list_position = 0
function add_inventory_item(inventory_item)
{
var index = inventory_items.length
inventory_items[index] = inventory_item
if((index == 0))
{
selected_inventory_item_color = get_inventory_item_color(inventory_item)
}
}
function get_inventory_item_by_color(color)
{
var cypherIndex2 = 0
while(cypherIndex2 < inventory_items.length)
{
var inventory_item = inventory_items[cypherIndex2]
cypherIndex2 += 1
if((get_inventory_item_color(inventory_item) == color))
{
return inventory_item
}
}
return false
}
function display_inventory_items()
{
var index = 0
while((index < inventory_div_amount))
{
document.getElementById("inventory.div." + index).style["border"] = "3px white solid"
var inventory_item = inventory_items[(index + inventory_list_position)]
if((inventory_item != undefined))
{
var color = get_inventory_item_color(inventory_item)
var red_value = (get_color_red(color) * 80)
var green_value = (get_color_green(color) * 80)
var blue_value = (get_color_blue(color) * 80)
var amount = get_inventory_item_amount(inventory_item)
document.getElementById("inventory.div." + index).innerHTML = "block " + color + ": x" + amount
document.getElementById("inventory.square." + index).style["background"] = "rgb(" + red_value + "," + green_value + "," + blue_value + ")"
if((color == selected_inventory_item_color))
{
document.getElementById("inventory.div." + index).style["border"] = "3px black solid"
}
} else {
document.getElementById("inventory.div." + index).innerHTML = " "
document.getElementById("inventory.square." + index).style["background"] = "white"
}
index += 1
}
}
function select_inventory_item(which)
{
var index = (parseInt(which) + inventory_list_position)
var inventory_item = inventory_items[index]
if((inventory_item != undefined))
{
selected_inventory_item_color = get_inventory_item_color(inventory_item)
display_inventory_items()
}
}
function scroll_inventory_list(offset)
{
var next_position = (inventory_list_position + parseInt(offset))
if(((next_position < 0) | (next_position > (inventory_items.length - 1))))
{
return false
}
inventory_list_position = next_position
display_inventory_items()
}
function offset_inventory_item_by_color(color, offset)
{
var inventory_item = get_inventory_item_by_color(color)
if((inventory_item == false))
{
if((offset > 0))
{
inventory_item = new_inventory_item(color, offset)
add_inventory_item(inventory_item)
display_inventory_items()
return true
} else {
return false
}
}
var amount = get_inventory_item_amount(inventory_item)
amount = (amount + offset)
if((amount > -(1)))
{
set_inventory_item_amount(inventory_item, amount)
display_inventory_items()
return true
} else {
return false
}
}
function set_point_x(inputObject, privateVarValue)
{
inputObject[1] = privateVarValue;
}
function get_point_x(inputObject)
{
return inputObject[1];
}
function set_point_y(inputObject, privateVarValue)
{
inputObject[2] = privateVarValue;
}
function get_point_y(inputObject)
{
return inputObject[2];
}
function new_point(x, y)
{
return ["point", x, y];
}

function draw_square(point, size, color)
{
var point_x = get_point_x(point)
var point_y = get_point_y(point)
var outline_color = 0
if((color == 0))
{
outline_color = 64
}
canvasContexts["canvas"].fillStyle = "rgb(" + outline_color + ", " + outline_color + ", " + outline_color + ")"
canvasContexts["canvas"].fillRect(point_x, point_y, size, size)
point_x += 1
point_y += 1
size += -2
var red = (get_color_red(color) * 85)
var green = (get_color_green(color) * 85)
var blue = (get_color_blue(color) * 85)
canvasContexts["canvas"].fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")"
canvasContexts["canvas"].fillRect(point_x, point_y, size, size)
}
function draw_polygon(coordinates, color, shade_offset)
{
var red = (shade_offset + (get_color_red(color) * 85))
var green = (shade_offset + (get_color_green(color) * 85))
var blue = (shade_offset + (get_color_blue(color) * 85))
canvasContexts["canvas"].fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")"
drawCanvasPolygon("canvas", coordinates)
}
function draw_cube_face(which, point, size, point_two, size_two, color)
{
if((which == 0))
{
var coordinates = [get_point_x(point_two),get_point_y(point_two),(get_point_x(point_two) + size_two),get_point_y(point_two),(get_point_x(point) + size),get_point_y(point),get_point_x(point),get_point_y(point)]
var shade_offset = 20
}
if((which == 1))
{
var coordinates = [(get_point_x(point_two) + size_two),get_point_y(point_two),(get_point_x(point_two) + size_two),(get_point_y(point_two) + size_two),(get_point_x(point) + size),(get_point_y(point) + size),(get_point_x(point) + size),get_point_y(point)]
var shade_offset = -20
}
if((which == 2))
{
var coordinates = [get_point_x(point_two),(get_point_y(point_two) + size_two),(get_point_x(point_two) + size_two),(get_point_y(point_two) + size_two),(get_point_x(point) + size),(get_point_y(point) + size),get_point_x(point),(get_point_y(point) + size)]
var shade_offset = -60
}
if((which == 3))
{
var coordinates = [get_point_x(point_two),get_point_y(point_two),get_point_x(point_two),(get_point_y(point_two) + size_two),get_point_x(point),(get_point_y(point) + size),get_point_x(point),get_point_y(point)]
var shade_offset = -20
}
draw_polygon(coordinates, color, shade_offset)
}
function draw_cube_polygons(point, size, point_two, size_two, color)
{
if((get_point_y(point_two) < get_point_y(point)))
{
draw_cube_face(0, point, size, point_two, size_two, color)
}
if(((get_point_x(point_two) + size_two) > (get_point_x(point) + size)))
{
draw_cube_face(1, point, size, point_two, size_two, color)
}
if(((get_point_y(point_two) + size_two) > (get_point_y(point) + size)))
{
draw_cube_face(2, point, size, point_two, size_two, color)
}
if((get_point_x(point_two) < get_point_x(point)))
{
draw_cube_face(3, point, size, point_two, size_two, color)
}
}
function draw_person(point, size)
{
var point_x = get_point_x(point)
var point_y = get_point_y(point)
canvasContexts["canvas"].fillStyle = "rgb(" + 0 + ", " + 0 + ", " + 0 + ")"
canvasContexts["canvas"].fillRect((point_x + ((size * 2) / 5)), point_y, (size / 5), (size / 5))
canvasContexts["canvas"].strokeStyle = "rgb(" + 0 + ", " + 0 + ", " + 0 + ")"
var middle_point_x = (point_x + (size / 2))
var pelvis_point_y = (point_y + ((size * 3) / 5))
var arm_point_y = (point_y + (size / 3))
var cypherContext = canvasContexts["canvas"]
cypherContext.beginPath()
cypherContext.moveTo(middle_point_x, (point_y + (size / 5)))
cypherContext.lineTo(middle_point_x, pelvis_point_y)
cypherContext.stroke()
var cypherContext = canvasContexts["canvas"]
cypherContext.beginPath()
cypherContext.moveTo((point_x + (size / 5)), arm_point_y)
cypherContext.lineTo((point_x + ((size * 4) / 5)), arm_point_y)
cypherContext.stroke()
var cypherContext = canvasContexts["canvas"]
cypherContext.beginPath()
cypherContext.moveTo(middle_point_x, pelvis_point_y)
cypherContext.lineTo((point_x + (size / 3)), (point_y + size))
cypherContext.stroke()
var cypherContext = canvasContexts["canvas"]
cypherContext.beginPath()
cypherContext.moveTo(middle_point_x, pelvis_point_y)
cypherContext.lineTo((point_x + ((size * 2) / 3)), (point_y + size))
cypherContext.stroke()
}
function draw_player()
{
var size = ((square_size * 2) / 3)
var point_x = ((canvas_width / 2) - (size / 2))
var point_y = (canvas_height / 2)
var point = new_point(point_x, point_y)
draw_person(point, size)
}
function set_pos_x(inputObject, privateVarValue)
{
inputObject[1] = privateVarValue;
}
function get_pos_x(inputObject)
{
return inputObject[1];
}
function set_pos_y(inputObject, privateVarValue)
{
inputObject[2] = privateVarValue;
}
function get_pos_y(inputObject)
{
return inputObject[2];
}
function set_pos_z(inputObject, privateVarValue)
{
inputObject[3] = privateVarValue;
}
function get_pos_z(inputObject)
{
return inputObject[3];
}
function new_pos(x, y, z)
{
return ["pos", x, y, z];
}

function add_pos(pos, offset)
{
set_pos_x(pos, (get_pos_x(pos) + get_pos_x(offset)))
set_pos_y(pos, (get_pos_y(pos) + get_pos_y(offset)))
set_pos_z(pos, (get_pos_z(pos) + get_pos_z(offset)))
}
function multiply_pos(pos, scale)
{
set_pos_x(pos, (get_pos_x(pos) * scale))
set_pos_y(pos, (get_pos_y(pos) * scale))
set_pos_z(pos, (get_pos_z(pos) * scale))
}
function pos_is_equal(pos, pos_two)
{
return (((get_pos_x(pos) == get_pos_x(pos_two)) && (get_pos_y(pos) == get_pos_y(pos_two))) && (get_pos_z(pos) == get_pos_z(pos_two)))
}
function set_layer_composition_pos_z(inputObject, privateVarValue)
{
inputObject[1] = privateVarValue;
}
function get_layer_composition_pos_z(inputObject)
{
return inputObject[1];
}
function set_layer_composition_size(inputObject, privateVarValue)
{
inputObject[2] = privateVarValue;
}
function get_layer_composition_size(inputObject)
{
return inputObject[2];
}
function set_layer_composition_colors(inputObject, privateVarValue)
{
inputObject[3] = privateVarValue;
}
function get_layer_composition_colors(inputObject)
{
return inputObject[3];
}
function new_layer_composition(pos_z, size, colors)
{
return ["layer_composition", pos_z, size, colors];
}

function empty_layer_composition(pos_z, size)
{
return new_layer_composition(pos_z, size, [])
}
function add_layer_composition_color(layer_composition, color, probability)
{
var layer_composition_colors = get_layer_composition_colors(layer_composition)
var temp = []
temp[0] = color
temp[1] = probability
var index = layer_composition_colors.length
layer_composition_colors[index] = temp
}
function pos_is_in_layer_composition(layer_composition, pos)
{
var pos_z = get_pos_z(pos)
var layer_pos_z = get_layer_composition_pos_z(layer_composition)
var layer_size = get_layer_composition_size(layer_composition)
if((!((pos_z < layer_pos_z)) && (pos_z < (layer_pos_z + layer_size))))
{
return true
}
return false
}
var layer_compositions = []
function add_layer_composition(layer_composition)
{
var index = layer_compositions.length
layer_compositions[index] = layer_composition
}
function get_layer_composition_at_pos(pos)
{
if((layer_compositions.length == 0))
{
return false
}
var index = 0
var output = false
while(((output == false) && (index < layer_compositions.length)))
{
var layer_composition = layer_compositions[index]
if(pos_is_in_layer_composition(layer_composition, pos))
{
output = layer_composition
}
index += 1
}
return output
}
function generate_layer_composition(pos)
{
var pos_z = get_pos_z(pos)
var size = 1
var count = (4 + parseInt((Math.random() * 20)))
while((count > 0))
{
if((get_layer_composition_at_pos(new_pos(0, 0, (pos_z - 1))) == false))
{
pos_z -= 1
size += 1
count -= 1
} else {
count = 0
}
}
var count = (4 + parseInt((Math.random() * (24 - size))))
while((count > 0))
{
if((get_layer_composition_at_pos(new_pos(0, 0, (pos_z + size))) == false))
{
size += 1
count -= 1
} else {
count = 0
}
}
var layer_composition = empty_layer_composition(pos_z, size)
var count = (2 + parseInt((Math.random() * 5)))
while((count > 0))
{
var color = parseInt((Math.random() * 63))
if((parseInt((Math.random() * 100)) > 75))
{
color = -1
}
var probability = (30 + parseInt((Math.random() * 70)))
add_layer_composition_color(layer_composition, color, probability)
count -= 1
}
add_layer_composition(layer_composition)
return layer_composition
}
function get_random_layer_composition_color(layer_composition)
{
var colors = get_layer_composition_colors(layer_composition)
var index = 0
while((index < colors.length))
{
var temp = colors[index]
var color = temp[0]
var probability = temp[1]
if(((parseInt((Math.random() * 100)) > probability) | (index == (colors.length - 1))))
{
return color
}
index += 1
}
return -1
}
function get_random_layer_composition_color_at_pos(pos)
{
var layer_composition = get_layer_composition_at_pos(pos)
if((layer_composition == false))
{
layer_composition = generate_layer_composition(pos)
}
var color = get_random_layer_composition_color(layer_composition)
return color
}
function set_world_cell(pos, color)
{
world_cells[get_pos_z(pos)][get_pos_y(pos)][get_pos_x(pos)] = color
}
function set_undefined_world_cell(pos, color)
{
var pos_z = get_pos_z(pos)
var pos_y = get_pos_y(pos)
var pos_x = get_pos_z(pos)
var temp = world_cells[pos_z]
if((temp == undefined))
{
world_cells[pos_z] = []
world_cells[pos_z][pos_y] = []
} else {
temp = temp[pos_y]
if((temp == undefined))
{
world_cells[pos_z][pos_y] = []
}
}
set_world_cell(pos, color)
}
function get_world_cell(pos)
{
var temp = world_cells[get_pos_z(pos)]
if((temp == undefined))
{
return undefined_color
}
temp = temp[get_pos_y(pos)]
if((temp == undefined))
{
return undefined_color
}
temp = temp[get_pos_x(pos)]
if((temp == undefined))
{
return undefined_color
}
return temp
}
function get_random_neighbor_cell(pos)
{
var count = 0
while((count < 10))
{
var offset = new_pos((1 - parseInt((Math.random() * 3))), (1 - parseInt((Math.random() * 3))), (1 - parseInt((Math.random() * 3))))
if(!(pos_is_equal(offset, new_pos(0, 0, 0))))
{
var neighbor_pos = pos.slice()
add_pos(neighbor_pos, offset)
var cell = get_world_cell(neighbor_pos)
if((cell != undefined_color))
{
return cell
}
}
count += 1
}
return -1
}
function generate_world_cell(pos)
{
var color = -1
if(((Math.random() * 4) > 1))
{
color = get_random_neighbor_cell(pos)
} else {
var empty_probability = 15
var pos_z = get_pos_z(pos)
var ground_level = 15
if((pos_z < ground_level))
{
empty_probability = (100 - ((100 - empty_probability) / (ground_level - pos_z)))
}
if(((Math.random() * 100) > empty_probability))
{
color = get_random_layer_composition_color_at_pos(pos)
}
}
set_undefined_world_cell(pos, color)
}
function reset_world_cells()
{
var pos = new_pos(0, 0, 0)
var temp_dim = new_pos(20, 20, 20)
world_cells = []
while((get_pos_z(pos) < get_pos_z(temp_dim)))
{
set_pos_y(pos, 0)
while((get_pos_y(pos) < get_pos_y(temp_dim)))
{
set_pos_x(pos, 0)
while((get_pos_x(pos) < get_pos_x(temp_dim)))
{
generate_world_cell(pos)
add_pos(pos, new_pos(1, 0, 0))
}
add_pos(pos, new_pos(0, 1, 0))
}
add_pos(pos, new_pos(0, 0, 1))
}
}
var world_cells = []
reset_world_cells()
var player_pos = new_pos(10, 10, 10)
var last_player_pos = new_pos(0, 0, 0)
var player_direction = new_pos(0, 1, 0)
function get_perpendicular_direction(direction)
{
var angle = Math.atan2(get_pos_y(direction), get_pos_x(direction))
angle = (angle + (Math.PI / 2))
return new_pos(Math.round(Math.cos(angle)), Math.round(Math.sin(angle)), 0)
}
function rotate_direction(direction, offset_angle)
{
var angle = Math.atan2(get_pos_y(direction), get_pos_x(direction))
angle = (angle + offset_angle)
set_pos_x(direction, Math.round(Math.cos(angle)))
set_pos_y(direction, Math.round(Math.sin(angle)))
}
function rotate_pos_by_direction(pos, direction)
{
var perpendicular_direction = get_perpendicular_direction(direction)
var output = new_pos(0, 0, get_pos_z(pos))
var offset = direction.slice()
multiply_pos(offset, get_pos_y(pos))
add_pos(output, offset)
offset = perpendicular_direction.slice()
multiply_pos(offset, get_pos_x(pos))
add_pos(output, offset)
return output
}
function clear_canvas()
{
canvasContexts["canvas"].fillStyle = "rgb(" + 255 + ", " + 255 + ", " + 255 + ")"
canvasContexts["canvas"].fillRect(0, 0, canvas_width, canvas_height)
}
function set_cube_pos(inputObject, privateVarValue)
{
inputObject[1] = privateVarValue;
}
function get_cube_pos(inputObject)
{
return inputObject[1];
}
function set_cube_color(inputObject, privateVarValue)
{
inputObject[2] = privateVarValue;
}
function get_cube_color(inputObject)
{
return inputObject[2];
}
function new_cube(pos, color)
{
return ["cube", pos, color];
}

var cubes_in_view = []
function add_cube_in_view(cube)
{
cubes_in_view[cubes_in_view.length] = cube
}
function set_cubes_in_view()
{
cubes_in_view = []
var view_radius = 5
var view_pos = new_pos(0, view_radius, 0)
while((get_pos_y(view_pos) > -(1)))
{
set_pos_z(view_pos, -(view_radius))
while((get_pos_z(view_pos) < (view_radius + 1)))
{
set_pos_x(view_pos, -(view_radius))
while((get_pos_x(view_pos) < (view_radius + 1)))
{
var pos = player_pos.slice()
add_pos(pos, rotate_pos_by_direction(view_pos, player_direction))
var color = get_world_cell(pos)
if((color == undefined_color))
{
generate_world_cell(pos)
}
if((color != -(1)))
{
var cube = new_cube(view_pos.slice(), color)
add_cube_in_view(cube)
}
add_pos(view_pos, new_pos(1, 0, 0))
}
add_pos(view_pos, new_pos(0, 0, 1))
}
add_pos(view_pos, new_pos(0, -(1), 0))
}
}
function cube_is_farther(cube, cube_two)
{
var pos = get_cube_pos(cube)
var pos_two = get_cube_pos(cube_two)
var distance = (Math.abs(get_pos_x(pos)) + Math.abs(get_pos_z(pos)))
var distance_two = (Math.abs(get_pos_x(pos_two)) + Math.abs(get_pos_z(pos_two)))
return (distance > distance_two)
}
function sort_cubes_in_view()
{
var start_index = 0
while((start_index < cubes_in_view.length))
{
var end_index = (start_index + 1)
var first_cube = cubes_in_view[start_index]
var segment_pos_y = get_pos_y(get_cube_pos(first_cube))
while((end_index < cubes_in_view.length))
{
var cube = cubes_in_view[end_index]
if((segment_pos_y > get_pos_y(get_cube_pos(cube))))
{
break
}
end_index += 1
}
while((start_index < end_index))
{
var index = start_index
var first_cube = cubes_in_view[index]
var farthest_cube = first_cube
var farthest_cube_index = index
index += 1
while((index < end_index))
{
var cube = cubes_in_view[index]
if(cube_is_farther(cube, farthest_cube))
{
farthest_cube = cube
farthest_cube_index = index
}
index += 1
}
cubes_in_view[start_index] = farthest_cube
cubes_in_view[farthest_cube_index] = first_cube
start_index += 1
}
}
}
function cube_is_on_canvas(point, size)
{
return !((((((get_point_x(point) + size) < 0) | (get_point_x(point) > canvas_width)) | ((get_point_y(point) + size) < 0)) | (get_point_y(point) > canvas_height)))
}
function draw_cubes_in_view()
{
var cypherIndex2 = 0
while(cypherIndex2 < cubes_in_view.length)
{
var cube = cubes_in_view[cypherIndex2]
cypherIndex2 += 1
var pos = getPrivateVariable(cube,"pos")
var scale = (getPrivateVariable(pos,"y") + 2.0)
var point_x = ((getPrivateVariable(pos,"x") - (1 / 2)) / scale)
var point_y = ((getPrivateVariable(pos,"z") - (1 / 2)) / scale)
point_x = ((point_x * square_size) + (canvas_width / 2))
point_y = ((point_y * square_size) + (canvas_height / 2))
var point = new_point(point_x, point_y)
var size = (square_size / scale)
scale = (getPrivateVariable(pos,"y") + 3.0)
point_x = ((getPrivateVariable(pos,"x") - (1 / 2)) / scale)
point_y = ((getPrivateVariable(pos,"z") - (1 / 2)) / scale)
point_x = ((point_x * square_size) + (canvas_width / 2))
point_y = ((point_y * square_size) + (canvas_height / 2))
var point_two = new_point(point_x, point_y)
var size_two = (square_size / scale)
if(cube_is_on_canvas(point_two, size_two))
{
draw_cube_polygons(point, size, point_two, size_two, getPrivateVariable(cube,"color"))
draw_square(point, size, getPrivateVariable(cube,"color"))
}
}
draw_player()
}
function draw_world_cells()
{
set_cubes_in_view()
sort_cubes_in_view()
draw_cubes_in_view()
}
function display_player_pos()
{
if(!(pos_is_equal(last_player_pos, player_pos)))
{
var temp_text = "("
temp_text += get_pos_x(player_pos)
temp_text += ", "
temp_text += get_pos_y(player_pos)
temp_text += ", "
temp_text += get_pos_z(player_pos)
temp_text += ")"
document.getElementById("pos.div").innerHTML = temp_text
last_player_pos = player_pos.slice()
}
}
function draw_everything()
{
clear_canvas()
draw_world_cells()
display_player_pos()
}
function person_may_occupy_pos(pos)
{
var lower_pos = pos.slice()
add_pos(lower_pos, new_pos(0, 0, 1))
return ((get_world_cell(pos) == -1) && (get_world_cell(lower_pos) == -1))
}
function process_world_cells()
{
var pos_below_player = player_pos.slice()
add_pos(pos_below_player, new_pos(0, 0, 1))
if(person_may_occupy_pos(pos_below_player))
{
add_pos(player_pos, new_pos(0, 0, 1))
}
draw_everything()
}
function move_player(offset)
{
var next_player_pos = player_pos.slice()
add_pos(next_player_pos, rotate_pos_by_direction(offset, player_direction))
if(!(person_may_occupy_pos(next_player_pos)))
{
add_pos(next_player_pos, new_pos(0, 0, -(1)))
}
if(!(person_may_occupy_pos(next_player_pos)))
{
return false
}
player_pos = next_player_pos
}
function rotate_player(angle)
{
rotate_direction(player_direction, angle)
}
function build_cell_near_player(offset)
{
var cell_pos = player_pos.slice()
add_pos(cell_pos, rotate_pos_by_direction(offset, player_direction))
var old_cell = get_world_cell(cell_pos)
var next_cell = selected_inventory_item_color
if((old_cell != -1))
{
offset_inventory_item_by_color(old_cell, 1)
next_cell = -1
}
if((next_cell != -1))
{
var has_inventory_item = offset_inventory_item_by_color(next_cell, -(1))
if(!(has_inventory_item))
{
return false
}
}
set_world_cell(cell_pos, next_cell)
}
var key_is_held = []
key_is_held["command"] = false
function key_down()
{
var key_code = cypherEvent["which"]
if((key_code == 91))
{
key_is_held["command"] = true
}
if(key_is_held["command"])
{
return 0
}
if((key_code == 65))
{
rotate_player(-((Math.PI / 2)))
}
if((key_code == 68))
{
rotate_player((Math.PI / 2))
}
if((key_code == 87))
{
move_player(new_pos(0, 1, 0))
}
if((key_code == 83))
{
move_player(new_pos(0, -(1), 0))
}
if((key_code == 90))
{
move_player(new_pos(-(1), 0, 0))
}
if((key_code == 67))
{
move_player(new_pos(1, 0, 0))
}
if((key_code == 84))
{
build_cell_near_player(new_pos(0, 1, -(1)))
}
if((key_code == 82))
{
build_cell_near_player(new_pos(0, 1, 0))
}
if((key_code == 70))
{
build_cell_near_player(new_pos(0, 1, 1))
}
if((key_code == 86))
{
build_cell_near_player(new_pos(0, 1, 2))
}
}
function key_up()
{
var key_code = cypherEvent["which"]
if((key_code == 91))
{
key_is_held["command"] = false
}
}
function compress_code(code)
{
var output = ""
var start_index = 0
var end_index = 1
while((start_index < code.length))
{
var count = 1
var first_character = code.substring(start_index, end_index)
var temp_text = first_character
start_index += 1
end_index += 1
while((((start_index < code.length) && (code.substring(start_index, end_index) == first_character)) && (count < (color_character_set.length - 1))))
{
count += 1
start_index += 1
end_index += 1
temp_text += first_character
}
if((count > 3))
{
temp_text = "<"
temp_text += color_character_set.substring(count, (count + 1))
temp_text += first_character
}
output += temp_text
}
return output
}
function decompress_code(code)
{
var output = ""
var start_index = 0
while((start_index < code.length))
{
var end_index = code.indexOf("<", start_index)
if((end_index == -1))
{
end_index = code.length
}
output += code.substring(start_index, end_index)
if((end_index > (code.length - 1)))
{
break
}
var temp_character = code.substring((end_index + 1), (end_index + 2))
var count = color_character_set.indexOf(temp_character)
temp_character = code.substring((end_index + 2), (end_index + 3))
while((count > 0))
{
output += temp_character
count -= 1
}
start_index = (end_index + 3)
}
return output
}
function get_code_from_world_cells()
{
var output = ""
var pos_z_keys = getArrayKeys(world_cells)
var cypherIndex2 = 0
while(cypherIndex2 < pos_z_keys.length)
{
var pos_z_key = pos_z_keys[cypherIndex2]
cypherIndex2 += 1
output += "(z" + pos_z_key + ")"
var temp_array_one = world_cells[pos_z_key]
var pos_y_keys = getArrayKeys(temp_array_one)
var cypherIndex3 = 0
while(cypherIndex3 < pos_y_keys.length)
{
var pos_y_key = pos_y_keys[cypherIndex3]
cypherIndex3 += 1
output += "(y" + pos_y_key + ")"
var temp_array_two = temp_array_one[pos_y_key]
var pos_x_keys = getArrayKeys(temp_array_two)
var last_pos_x_key = "bupkis"
var cypherIndex4 = 0
while(cypherIndex4 < pos_x_keys.length)
{
var pos_x_key = pos_x_keys[cypherIndex4]
cypherIndex4 += 1
if((pos_x_key != (last_pos_x_key + 1)))
{
output += "(x" + pos_x_key + ")"
}
last_pos_x_key = parseInt(pos_x_key)
var cell = temp_array_two[pos_x_key]
var color_character = color_character_set.substring((cell + 1), (cell + 2))
output += color_character
}
}
}
return output
}
function get_code_from_player_pos_and_direction()
{
var output = "(x)"
output += get_pos_x(player_pos)
output += "(y)"
output += get_pos_y(player_pos)
output += "(z)"
output += get_pos_z(player_pos)
output += "(dx)"
output += get_pos_x(player_direction)
output += "(dy)"
output += get_pos_y(player_direction)
return output
}
function get_code_from_layer_compositions()
{
var output = ""
var cypherIndex2 = 0
while(cypherIndex2 < layer_compositions.length)
{
var layer_composition = layer_compositions[cypherIndex2]
cypherIndex2 += 1
output += "(z)"
output += get_layer_composition_pos_z(layer_composition)
output += "(s)"
output += get_layer_composition_size(layer_composition)
var color_probability_arrays = get_layer_composition_colors(layer_composition)
var cypherIndex3 = 0
while(cypherIndex3 < color_probability_arrays.length)
{
var color_probability_array = color_probability_arrays[cypherIndex3]
cypherIndex3 += 1
output += "(c)"
output += color_probability_array[0]
output += "(p)"
output += color_probability_array[1]
}
}
return output
}
function get_code_from_inventory_items()
{
var output = ""
var cypherIndex2 = 0
while(cypherIndex2 < inventory_items.length)
{
var inventory_item = inventory_items[cypherIndex2]
cypherIndex2 += 1
output += "(c)"
output += get_inventory_item_color(inventory_item)
output += "(a)"
output += get_inventory_item_amount(inventory_item)
}
return output
}
function get_code_from_world()
{
var output = "[w]"
output += get_code_from_world_cells()
output += "[p]"
output += get_code_from_player_pos_and_direction()
output += "[l]"
output += get_code_from_layer_compositions()
output += "[i]"
output += get_code_from_inventory_items()
return compress_code(output)
}
function set_world_cells_from_code(code)
{
code = decompress_code(code)
world_cells = []
var pos = new_pos(0, 0, 0)
var start_index = 0
while((start_index < code.length))
{
var color_character = code.substring(start_index, (start_index + 1))
if((color_character == "("))
{
start_index += 1
var axis = code.substring(start_index, (start_index + 1))
start_index += 1
var end_index = code.indexOf(")", start_index)
var number = parseInt(code.substring(start_index, end_index))
if((axis == "x"))
{
set_pos_x(pos, number)
}
if((axis == "y"))
{
set_pos_y(pos, number)
}
if((axis == "z"))
{
set_pos_z(pos, number)
}
start_index = (end_index + 1)
} else {
var color = (color_character_set.indexOf(color_character) - 1)
set_undefined_world_cell(pos, color)
add_pos(pos, new_pos(1, 0, 0))
start_index += 1
}
}
}
function set_player_position_and_direction_from_code(code)
{
var start_index = (code.indexOf("(x)") + 3)
var end_index = code.indexOf("(y)", start_index)
set_pos_x(player_pos, parseInt(code.substring(start_index, end_index)))
start_index = (end_index + 3)
end_index = code.indexOf("(z)", start_index)
set_pos_y(player_pos, parseInt(code.substring(start_index, end_index)))
start_index = (end_index + 3)
end_index = code.indexOf("(dx)", start_index)
set_pos_z(player_pos, parseInt(code.substring(start_index, end_index)))
start_index = (end_index + 4)
end_index = code.indexOf("(dy)", start_index)
set_pos_x(player_direction, parseInt(code.substring(start_index, end_index)))
start_index = (end_index + 4)
end_index = code.length
set_pos_y(player_direction, parseInt(code.substring(start_index, end_index)))
}
function set_layer_compositions_from_code(code)
{
layer_compositions = []
var end_index = 0
while((end_index < code.length))
{
var start_index = (end_index + 3)
end_index = code.indexOf("(s)", start_index)
var pos_z = parseInt(code.substring(start_index, end_index))
start_index = (end_index + 3)
end_index = code.indexOf("(c)", start_index)
var size = parseInt(code.substring(start_index, end_index))
var temp_array = []
while(((code.substring(end_index, (end_index + 3)) != "(z)") && (end_index < code.length)))
{
var color_probability = []
start_index = (end_index + 3)
end_index = code.indexOf("(p)", start_index)
color_probability[color_probability.length] = parseInt(code.substring(start_index, end_index))
start_index = (end_index + 3)
end_index = code.indexOf("(", start_index)
if((end_index == -(1)))
{
end_index = code.length
}
color_probability[color_probability.length] = parseInt(code.substring(start_index, end_index))
temp_array[temp_array.length] = color_probability
}
var layer_composition = new_layer_composition(pos_z, size, temp_array)
layer_compositions[layer_compositions.length] = layer_composition
}
}
function set_inventory_items_from_code(code)
{
inventory_items = []
var end_index = 0
while((end_index < code.length))
{
var start_index = (end_index + 3)
end_index = code.indexOf("(a)", start_index)
var color = parseInt(code.substring(start_index, end_index))
start_index = (end_index + 3)
end_index = code.indexOf("(c)", start_index)
if((end_index == -(1)))
{
end_index = code.length
}
var amount = parseInt(code.substring(start_index, end_index))
var inventory_item = new_inventory_item(color, amount)
inventory_items[inventory_items.length] = inventory_item
}
selected_inventory_item_color = -1
display_inventory_items()
}
function set_world_from_code(world_code)
{
var start_index = (world_code.indexOf("[w]") + 3)
var end_index = world_code.indexOf("[p]", start_index)
set_world_cells_from_code(world_code.substring(start_index, end_index))
start_index = (end_index + 3)
end_index = world_code.indexOf("[l]", start_index)
set_player_position_and_direction_from_code(world_code.substring(start_index, end_index))
start_index = (end_index + 3)
end_index = world_code.indexOf("[i]", start_index)
set_layer_compositions_from_code(world_code.substring(start_index, end_index))
start_index = (end_index + 3)
end_index = world_code.length
set_inventory_items_from_code(world_code.substring(start_index, end_index))
}
function display_world_code()
{
var world_code = get_code_from_world()
setTagAttribute("world.code", "value", world_code)
}
function set_world_from_textbox()
{
var world_code = getTagAttribute("world.code", "value")
set_world_from_code(world_code)
}
document.getElementById("body").setAttribute("onkeydown", "cypherEvent = event; " + "key_down" + "()")
document.getElementById("body").setAttribute("onkeyup", "cypherEvent = event; " + "key_up" + "()")
setInterval("" + "process_world_cells" + "()", 200)
draw_everything()