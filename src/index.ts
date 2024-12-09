import fs from 'fs';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import 'zod-openapi/extend';
import { createDocument } from 'zod-openapi';
import { cors } from './config/cors';
import { swaggerUI } from '@hono/swagger-ui';
import productController, { oaspGetProducts } from './controller/ProductController';
import categoryController, { oaspGetCategories } from './controller/CategoryController';
import gstRateController, { oaspGetGstRates } from './controller/GstRateController';
import accessRoleController, { oaspGetAccessRoles } from './controller/AccessRoleController';
import userController, { oaspGetUser } from './controller/UserController';
import targetController, { oaspGetTargets } from './controller/TargetController';
import productModelController, { oaspGetProductModel } from './controller/ProductModelController';
import stateController, { oaspGetStates } from './controller/StateController';
import contactNatureController, { oaspGetContactNatures } from './controller/ContactNatureController';
import inquirySourceController, { oaspGetInquirySources } from './controller/InquirySourceController';
import industryController, { oaspGetIndustries } from './controller/IndustryController';
import machineController, { oaspGetMachines } from './controller/MachineController';
import competitorController, { oaspGetCompetitors } from './controller/CompetitorController';
import customerController, { oaspGetCustomers } from './controller/CustomerController';
import contactController, { oaspGetContacts } from './controller/ContactController';
import bankController, { oaspGetBanks } from './controller/BankController';
import paymentmethodController, { oaspGetPaymentmethods } from './controller/PaymentMethodController';
import defaultOtherChargeController, { oaspGetDefaultOtherCharges } from './controller/DefaultOtherChargeController';
import businessInfoOtherController, { oaspGetBusinessInfoOthers } from './controller/BusinessInfoOtherController';
import currencyController, { oaspGetCurrrencies } from './controller/CurrencyController';
import customercontactController, { oaspGetCustomerContacts } from './controller/CustomerContactController';

const app = new Hono();



// Apply CORS middleware globally

console.log("**")

app.use('*', async (c, next) => {
	c.res.headers.append('Access-Control-Allow-Origin', 'http://localhost:5173');
	// c.res.headers.append('Access-Control-Allow-Origin', 'https://quotation-system-ten.vercel.app');

	c.res.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	c.res.headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	// Handle preflight OPTIONS request
	if (c.req.method === 'OPTIONS') {
		return c.text('', 204); // Respond with status 204 for preflight
	}

	await next();
});



// Serve static files
// app.use('/static/*', serveStatic({ root: './static' }));

// // Serve Swagger UI files
// app.use('/swagger-ui/*', serveStatic({ root: './static/swagger-ui' }));

// // Swagger UI endpoint
// app.get('/ui', (c) => {
//   const html = fs.readFileSync('./static/swagger-ui/index.html', 'utf-8')
//     .replace('https://petstore.swagger.io/v2/swagger.json', './static/openapi.json');
//   console.log(html);
// 	return c.html(html);
// });

app.use('/static/*', serveStatic({ root: './' }));
console.log(process.cwd());
app.get('/ui', swaggerUI({ url: './static/openapi.json' }));

// app.get('/ui', (c) => {
// 	const html = fs.readFileSync('./static/swagger-ui/index.html', 'utf-8').replace('https://petstore.swagger.io/v2/swagger.json', './static/openapi.json');
// 	return c.html(html);
// });

// API routes
app.get('/', (c) => {
	return c.text('Hello Hono!');
});
app.route('/products', productController);
app.route('/categories', categoryController);
app.route('/gst-rates', gstRateController);
app.route('/access-roles', accessRoleController);
app.route('/users', userController);
app.route('/targets', targetController);
app.route('/product-models', productModelController);
app.route('/states', stateController);
app.route('/contact-natures', contactNatureController);
app.route('/inquiry-sources', inquirySourceController);
app.route('/industries', industryController);
app.route('/machines', machineController);
app.route('/competitors', competitorController);
app.route('/customers', customerController);
app.route('/contacts', contactController);
app.route('/banks', bankController);
app.route('/payment-methods', paymentmethodController);
app.route('/default-other-charges', defaultOtherChargeController);
app.route('/business-info-others', businessInfoOtherController);
app.route('/currencies', currencyController);
app.route('/customer-contacts', customercontactController);

// Generate OpenAPI document
const document = createDocument({
	openapi: '3.1.0',
	info: {
		title: 'Radiant Quotation API',
		version: '1.0.0',
	},
	tags: [
		{
			"name": "user-controller",
			"description": "Operations related to users"
		},
		{
			"name": "access-role-controller",
			"description": "Operations related to access roles"
		},
		{
			"name": "category-controller",
			"description": "Operations related to categories"
		},
		{
			"name": "gst-rate-controller",
			"description": "Operations related to gst rates"
		},
		{
			"name": "product-controller",
			"description": "Operations related to products"
		},
		{
			"name": "target-controller",
			"description": "Operations related to target"
		},
		{
			"name": "product-model-controller",
			"description": "Operations related to product model number"
		},
		{
			"name": "state-controller",
			"description": "Operations related to state"
		},
		{
			"name": "contact-nature-controller",
			"description": "Operations related to contact nature"
		},
		{
			"name": "inquiry-source-controller",
			"description": "Operations related to inquiry source"
		},
		{
			"name": "industry-controller",
			"description": "Operations related to industry"
		},
		{
			"name": "machine-controller",
			"description": "Operations related to machine"
		},
		{
			"name": "competitor-controller",
			"description": "Operations related to competitor"
		},
		{
			"name": "customer-controller",
			"description": "Operations related to customer"
		},
		{
			"name": "contact-controller",
			"description": "Operations related to contact"
		},
		{
			"name": "bank-controller",
			"description": "Operations related to bank"
		},
		{
			"name": "payment-method-controller",
			"description": "Operations related to payment method"
		},
		{
			"name": "default-other-charge-controller",
			"description": "Operations related to Default Other Charge"
		},
		{
			"name": "business-info-other-controller",
			"description": "Operations related to Business Information Other."
		},
		{
			"name": "currency-controller",
			"description": "Operations related to currency."
		},
		{
			"name": "customer-contact-controller",
			"description": "Operations related to customer contacts."
		}
	].sort((a, b) => { return a.name.localeCompare(b.name); }),

	paths: { ...oaspGetAccessRoles, ...oaspGetUser, ...oaspGetCategories, ...oaspGetGstRates, ...oaspGetProducts, ...oaspGetTargets, ...oaspGetProductModel, ...oaspGetStates, ...oaspGetContactNatures, ...oaspGetInquirySources, ...oaspGetIndustries, ...oaspGetMachines, ...oaspGetCompetitors, ...oaspGetCustomers, ...oaspGetContacts, ...oaspGetBanks, ...oaspGetPaymentmethods, ...oaspGetDefaultOtherCharges, ...oaspGetBusinessInfoOthers, ...oaspGetCurrrencies, ...oaspGetCustomerContacts }
});
fs.writeFileSync('./static/openapi.json', JSON.stringify(document));

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
	fetch: app.fetch,
	port
});