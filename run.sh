#!/bin/bash

forever --uid conversions -a start ./node_modules/http-server/bin/http-server dist -c-1 --cors
