# ROUTES

## Keepin it RESTful

B(rowse), R(ead), E(edit), A(dd), D(elete)

# maps

B - GET /maps             - Home page (search) 

R - GET /maps/:id         - Specific map 

E - POST /maps/:id/edit   - Just a button -> IF authenticated Go to POST /maps create page, ELSE GET /user(Stretch Put /maps/:id)

A - POST /maps            - Create page 

D - POST /maps/:id/delete - button call Redirect to -> GET/maps (Stretch Put /map/:id)

# Users

B - GET /users

R - GET /users/:id

E - POST /users/:id/edit    (Stretch Put /users/:id)

A - POST /users

D - POST /users/:id/delete   (Stretch DELETE /users/:id)

# points

B - GET /points

R - GET /points/:id

E - POST /points/:id/edit    (Stretch Put /points/:id)

A - POST /points

D - POST /points/:id/delete   (Stretch DELETE /points/:id)

