import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import React, {lazy, Suspense, useContext, useEffect, useState} from "react";
import {LinearProgress} from "@mui/material";
import PrivateRoute from "./components/General/PrivateRoute";
import ScrollToTop from "./components/General/ScrollToTop";
import useLocalStorage from "./components/General/useLocalStorage";
import {AppContext} from "./components/General/AppContext";
const SecondaryHeader = lazy(() => import("./components/General/SecondaryHeader"));
const PrimaryHeader = lazy(() => import("./components/General/PrimaryHeader"));
const AboutMarkey = lazy(() => import("./pages/General/AboutMarkey"));
const Terms = lazy(() => import("./pages/General/Terms"));
const SecurityPolicy = lazy(() => import("./pages/General/SecurityPolicy"));
const AllProducts = lazy(() => import("./pages/Salesman/AllProducts"));
const ViewProduct = lazy(() => import("./pages/Salesman/ViewProduct"));
const EditProduct = lazy(() => import("./pages/Salesman/EditProduct"));
const AddProduct = lazy(() => import("./pages/Salesman/AddProduct"));
const AllBlogs = lazy(() => import("./pages/Salesman/AllBlogs"));
const ViewBlog = lazy(() => import("./pages/Salesman/ViewBlog"));
const EditBlog = lazy(() => import("./pages/Salesman/EditBlog"));
const AddBlog = lazy(() => import("./pages/Salesman/AddBlog"));
const ViewShopInfo = lazy(() => import("./pages/Salesman/ViewShopInfo"));
const EditShopInfo = lazy(() => import("./pages/Salesman/EditShopInfo"));
const SalesmanChangePassword = lazy(() => import("./pages/Salesman/SalesmanChangePassword"));
const ViewShopDetailsVerify = lazy(() => import("./pages/Admin/ViewShopDetailsVerify"));
const AllCategories = lazy(() => import("./pages/Admin/AllCategories"));
const EditCategory = lazy(() => import("./pages/Admin/EditCategory"));
const AddCategory = lazy(() => import("./pages/Admin/AddCategory"));
const ManageShopper = lazy(() => import("./pages/Admin/ManageShopper"));
const BanShopperDetails = lazy(() => import("./pages/Admin/BanShopperDetails"));
const ManageSalesman = lazy(() => import("./pages/Admin/ManageSalesman"));
const BanSalesmanDetails = lazy(() => import("./pages/Admin/BanSalesmanDetails"));
const RecommendedBlogs = lazy(() => import("./pages/Shopper/RecommendedBlogs"));
const ProductDetails = lazy(() => import("./pages/Shopper/ProductDetails"));
const CategoryProducts = lazy(() => import("./pages/Shopper/CategoryProducts"));
const CategoryBlogs = lazy(() => import("./pages/Shopper/CategoryBlogs"));
const HomeBlog = lazy(() => import("./pages/Shopper/HomeBlog"));
const BlogDetails = lazy(() => import("./pages/Shopper/BlogDetails"));
const ShopperCart = lazy(() => import("./pages/Shopper/ShopperCart"));
const ShopperProfile = lazy(() => import("./pages/Shopper/ShopperProfile"));
const ShopperChangePassword = lazy(() => import("./pages/Shopper/ShopperChangePassword"));
const ShopperAddress = lazy(() => import("./pages/Shopper/ShopperAddress"));
const ShopperNotification = lazy(() => import("./pages/Shopper/ShopperNotification"));
const ShopperOrder = lazy(() => import("./pages/Shopper/ShopperOrder"));
const PhoneVerification = lazy(() => import("./pages/Login_Register_Forget/PhoneVerification"));
const EnterPasswordR = lazy(() => import("./pages/Login_Register_Forget/EnterPasswordR"));
const EnterShopperInfo = lazy(() => import("./pages/Login_Register_Forget/EnterShopperInfo"));
const EnterSalesmanInfo = lazy(() => import("./pages/Login_Register_Forget/EnterSalesmanInfo"));
const RegisterFinished = lazy(() => import("./pages/Login_Register_Forget/RegisterFinished"));
const SalesmanFinishedR = lazy(() => import("./pages/Login_Register_Forget/SalesmanFinishedR"));
const EnterPhoneF = lazy(() => import("./pages/Login_Register_Forget/EnterPhoneF"));
const EnterPasswordF = lazy(() => import("./pages/Login_Register_Forget/EnterPasswordF"));
const ForgetFinished = lazy(() => import("./pages/Login_Register_Forget/ForgetFinished")) ;
const ChangeEmail = lazy(() => import("./pages/Login_Register_Forget/ChangeEmail"));
const ChangePhoneNumber = lazy(() => import("./pages/Login_Register_Forget/ChangePhoneNumber"));
const ChangeEmailFinished = lazy(() => import("./pages/Login_Register_Forget/ChangeEmailFinished"));
const ChangePhoneFinished = lazy(() => import("./pages/Login_Register_Forget/ChangePhoneFinished"));
const RecommendedProducts = lazy(() => import("./pages/Shopper/RecommendedProducts"));
const ShopDetails = lazy(() => import("./pages/Shopper/ShopDetails"));
const Register = lazy(() => import("./pages/Login_Register_Forget/Register"));
const VerifySalesman = lazy(() => import("./pages/Admin/VerifySalesman"));
const AllOrders = lazy(() => import("./pages/Salesman/AllOrders"));
const HomeShopper = lazy(() => import("./pages/Shopper/HomeShopper"));
const Login = lazy(() => import("./pages/Login_Register_Forget/Login"));
const NotFound = lazy(() => import("./components/General/NotFound"));
const SearchProduct = lazy(() => import("./pages/Shopper/SearchProduct"));

function App() {

    const { triggerEffect } = useContext(AppContext);
    // Get token from localStorage

    const authStorage = useLocalStorage('auth');
    const tokenStorage = useLocalStorage('token');
    const roleStorage = useLocalStorage('role');

    useEffect(() => {
        if (tokenStorage) {
            authStorage.set(true);
        }
    }, [triggerEffect]);

  return (
    <>
        <Router>
            <Suspense fallback={<LinearProgress/>}>
                <ScrollToTop/>

                <Routes>
                    {/*Login, Register, Forget Password, Change email and phone number routes*/}
                    <Route path="/login" element={<Login/>}/>

                    {/*Register*/}
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/register/enter-password" element={<EnterPasswordR/>}/>
                    <Route path="/register/enter-shopper-info" element={<EnterShopperInfo/>}/>
                    <Route path="/register/enter-salesman-info" element={<EnterSalesmanInfo/>}/>
                    <Route path="/register/phone-verification" element={<PhoneVerification method="register"/>}/>
                    <Route path="/register/shopper-finish" element={<RegisterFinished/>}/>
                    <Route path="/register/salesman-finish" element={<SalesmanFinishedR/>}/>

                    {/*Forget password*/}
                    <Route path="/forget-password" element={<EnterPhoneF/>}/>
                    <Route path="/forget-password/phone-verification" element={<PhoneVerification method="forget"/>}/>
                    <Route path="/forget-password/enter-password" element={<EnterPasswordF/>}/>
                    <Route path="/forget-password/finished" element={<ForgetFinished/>}/>

                    {/*Change email and phone*/}
                    <Route path="/change-email" element={<ChangeEmail/>}/>
                    <Route path="/change-phone" element={<ChangePhoneNumber/>}/>
                    <Route path="/change-email/phone-verification" element={<PhoneVerification method="email"/>}/>
                    <Route path="/change-phone/phone-verification" element={<PhoneVerification method="phone"/>}/>
                    <Route path="/change-email/finished" element={<ChangeEmailFinished/>}/>
                    <Route path="/change-phone/finished" element={<ChangePhoneFinished/>}/>

                    {/*Shopper*/}
                    <Route element={<PrivateRoute isAuthenticated={authStorage.get()} userRole={String(roleStorage.get())} requiredRole="shopper"/>}>
                        {/*// Shopper routes*/}
                        <Route element={<PrimaryHeader/>}>
                            <Route path="/shopper" element={<HomeShopper/>}/>

                            {/*Shopper Product*/}
                            <Route path="/shopper/product/:productId" element={<ProductDetails/>}/>
                            <Route path="/shopper/shop/:shopId" element={<ShopDetails/>}/>
                            <Route path="/shopper/recommended-products" element={<RecommendedProducts/>}/>
                            <Route path="/shopper/category-products/:categoryId" element={<CategoryProducts/>}/>

                            {/*Shopper Account*/}
                            <Route path="/shopper/profile" element={<ShopperProfile/>}/>
                            <Route path="/shopper/change-password" element={<ShopperChangePassword/>}/>
                            <Route path="/shopper/address" element={<ShopperAddress/>}/>
                            <Route path="/shopper/notification" element={<ShopperNotification/>}/>
                            <Route path="/shopper/order" element={<ShopperOrder/>}/>
                        </Route>

                        <Route path="/shopper/search-products/:productName" element={<SearchProduct/>}/>

                        {/*Shopper Cart*/}
                        <Route path="/shopper/cart" element={<ShopperCart/>}/>

                        <Route element={<SecondaryHeader head="Markey Blog"/>}>
                            {/*Shopper Blog*/}
                            <Route path="/shopper/blog" element={<HomeBlog/>}/>
                            <Route path="/shopper/blog/:blogId" element={<BlogDetails/>}/>
                            <Route path="/shopper/category-blogs/:categoryId" element={<CategoryBlogs/>}/>
                            <Route path="/shopper/recommended-blogs" element={<RecommendedBlogs/>}/>
                        </Route>
                    </Route>

                    {/*Salesman*/}
                    <Route element={<PrivateRoute isAuthenticated={authStorage.get()} userRole={String(roleStorage.get())} requiredRole="salesman"/>}>
                        {/* Salesman routes*/}
                        <Route element={<SecondaryHeader head="Kênh người bán"/>}>
                            <Route path="/salesman" element={<AllOrders/>}/>

                            {/*Salesman Product*/}
                            <Route path="/salesman/all-products" element={<AllProducts/>}/>
                            <Route path="/salesman/view-product/:productId" element={<ViewProduct/>}/>
                            <Route path="/salesman/edit-product/:productId" element={<EditProduct/>}/>
                            <Route path="/salesman/add-product" element={<AddProduct/>}/>

                            {/*Salesman Blog*/}
                            <Route path="/salesman/all-blogs" element={<AllBlogs/>}/>
                            <Route path="/salesman/view-blog/:blogId" element={<ViewBlog/>}/>
                            <Route path="/salesman/edit-blog/:blogId" element={<EditBlog/>}/>
                            <Route path="/salesman/add-blog" element={<AddBlog/>}/>

                            {/*Salesman Profile*/}
                            <Route path="/salesman/profile" element={<ViewShopInfo/>}/>
                            <Route path="/salesman/edit-profile" element={<EditShopInfo/>}/>
                            <Route path="/salesman/change-password" element={<SalesmanChangePassword/>}/>
                        </Route>
                    </Route>


                    {/*Admin*/}
                    <Route element={<PrivateRoute isAuthenticated={authStorage.get()} userRole={String(roleStorage.get())} requiredRole="admin"/>}>
                        {/* Admin routes*/}
                        <Route element={<SecondaryHeader head="Quản trị viên"/>}>
                            <Route path="/admin" element={<VerifySalesman/>}/>
                            <Route path="/admin/verify-salesman/:salesmanId" element={<ViewShopDetailsVerify/>}/>

                            {/*Admin Categories*/}
                            <Route path="/admin/all-categories" element={<AllCategories/>}/>
                            <Route path="/admin/edit-category/:categoryId" element={<EditCategory/>}/>
                            <Route path="/admin/add-category" element={<AddCategory/>}/>

                            {/*Admin manage Shopper and Salesman*/}
                            <Route path="/admin/shopper" element={<ManageShopper/>}/>
                            <Route path="/admin/shopper/:shopperId" element={<BanShopperDetails/>}/>
                            <Route path="/admin/salesman" element={<ManageSalesman/>}/>
                            <Route path="/admin/salesman/:salesmanId" element={<BanSalesmanDetails/>}/>
                        </Route>
                    </Route>


                    {/*General*/}
                    <Route path="/about" element={<AboutMarkey/>}/>
                    <Route path="/terms" element={<Terms/>}/>
                    <Route path="/policy" element={<SecurityPolicy/>}/>

                    {/* Route mặc định */}
                    <Route path="/" element={<Navigate to={authStorage.get() === true ? (String(roleStorage.get()) === 'shopper' ? '/shopper' : String(roleStorage.get()) === 'admin' ? '/admin' : '/salesman') : '/login'} />} />

                    {/* Route cho trang 404 */}
                    <Route path="/404" element={<NotFound />} />

                    {/* Route mặc định cho trang không tồn tại */}
                    <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
            </Suspense>
        </Router>
    </>
  );
}

export default App;
