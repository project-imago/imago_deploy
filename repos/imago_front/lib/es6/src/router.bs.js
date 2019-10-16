// Generated by BUCKLESCRIPT VERSION 6.0.3, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Printf from "bs-platform/lib/es6/printf.js";
import * as Caml_chrome_debugger from "bs-platform/lib/es6/caml_chrome_debugger.js";

function route_of_location($$location) {
  var route = $$location[/* hash */7].split("/");
  if (route.length !== 3) {
    return /* Index */0;
  } else {
    var match = route[0];
    if (match === "#") {
      var match$1 = route[1];
      if (match$1 === "room") {
        var room_id = route[2];
        return /* ChatRoute */Caml_chrome_debugger.simpleVariant("ChatRoute", [/* Room */Caml_chrome_debugger.simpleVariant("Room", [room_id])]);
      } else {
        return /* Index */0;
      }
    } else {
      return /* Index */0;
    }
  }
}

function location_of_route(param) {
  if (param) {
    return Curry._1(Printf.sprintf(/* Format */Caml_chrome_debugger.simpleVariant("Format", [
                      /* String_literal */Caml_chrome_debugger.variant("String_literal", 11, [
                          "#/room/",
                          /* String */Caml_chrome_debugger.variant("String", 2, [
                              /* No_padding */0,
                              /* End_of_format */0
                            ])
                        ]),
                      "#/room/%s"
                    ])), param[0][0]);
  } else {
    return "#/";
  }
}

export {
  route_of_location ,
  location_of_route ,
  
}
/* No side effect */