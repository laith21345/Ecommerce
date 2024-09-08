import './polyfills.server.mjs';
import{a as B}from"./chunk-W663GE3O.mjs";import{a as O,b as Q}from"./chunk-CELE4F6T.mjs";import"./chunk-GTSSCL6B.mjs";import"./chunk-6AIGYBES.mjs";import{l as V}from"./chunk-NMIYAXY6.mjs";import{o as F}from"./chunk-G7SPZNB4.mjs";import{$ as I,Ab as u,Ib as o,Jb as d,Ma as g,Qa as l,Qb as E,Sb as P,Wb as x,X as v,Yb as b,gb as w,ib as h,ja as C,ka as f,mb as y,ob as k,pb as T,qb as n,rb as r,sb as m,vb as S,zb as _}from"./chunk-WBN27DHN.mjs";import"./chunk-VVCT4QZE.mjs";var D=(a,c)=>c.product.id,L=a=>["/orders",a];function U(a,c){if(a&1){let e=S();n(0,"div",6)(1,"div",8)(2,"div"),m(3,"img",9),x(4,"trimText"),r()(),n(5,"div",10)(6,"div",1)(7,"div")(8,"h2",11),o(9),x(10,"trimText"),r(),n(11,"span",4),o(12),x(13,"currency"),r(),m(14,"br"),n(15,"button",12),_("click",function(){let t=C(e).$implicit,s=u(2);return f(s.removeItem(t.product.id))}),m(16,"i",13),o(17," Remove "),r()(),n(18,"div",14)(19,"span",15),_("click",function(){let t=C(e).$implicit,s=u(2);return f(s.decCount(t.product.id,t.count))}),m(20,"i",16),r(),n(21,"span"),o(22),r(),n(23,"span",15),_("click",function(){let t=C(e).$implicit,s=u(2);return f(s.incCount(t.product.id,t.count))}),m(24,"i",17),r()()()()()}if(a&2){let e=c.$implicit;l(3),h("src",e.product.imageCover,g)("alt",b(4,5,e.product.title,2)),l(6),d(b(10,8,e.product.title,2)),l(3),d(b(13,11,e.price,"GBP")),l(10),d(e.count)}}function $(a,c){if(a&1){let e=S();n(0,"div",1)(1,"div")(2,"h1",2),o(3,"Cart Shop"),r(),n(4,"p",3),o(5,"Total price : "),n(6,"span",4),o(7),x(8,"currency"),r()()(),n(9,"div")(10,"button",5),o(11,"Check Out"),r(),n(12,"p"),o(13,"total number of items: "),n(14,"span",4),o(15),r()()()(),k(16,U,25,14,"div",6,D),n(18,"button",7),_("click",function(){C(e);let t=u();return f(t.clearCart())}),o(19,"Clear Cart"),r()}if(a&2){let e=u();l(7),d(b(8,3,e.cartInfo.data==null?null:e.cartInfo.data.totalCartPrice,"GBP")),l(3),h("routerLink",P(6,L,e.cartInfo.cartId)),l(5),d(e.cartInfo.numOfCartItems),l(),T(e.cartInfo.data==null?null:e.cartInfo.data.products)}}function R(a,c){a&1&&(n(0,"h1",18),o(1,"NO Cart Item"),r())}var J=(()=>{let c=class c{constructor(){this._CartService=v(O),this._ToastrService=v(Q),this.cartInfo={status:"",cartId:"",numOfCartItems:0,data:null},this.cartProductsList=this.cartInfo?.data?.products}ngOnInit(){this._CartService.getLoggedUserCart().subscribe({next:i=>{i.status=="success"&&(this.cartInfo=i,console.log(i))}})}removeItem(i){this.removeSpecificCartItemSub=this._CartService.removeSpecificCartItem(i).subscribe({next:t=>{t.status=="success"&&(this.cartInfo=t,console.log(t),this._CartService.cartCount.set(t.numOfCartItems),this._ToastrService.success("Remove Item was Done \u2639\uFE0F","Fresh Cart"))}})}incCount(i,t){let s=t+1;this.incCartProductQuantitySub=this._CartService.updateCartProductQuantity(i,s).subscribe({next:p=>{p.status=="success"&&(this.cartInfo=p)}})}decCount(i,t){let s=t-1;s!=0&&(this.decCartProductQuantitySub=this._CartService.updateCartProductQuantity(i,s).subscribe({next:p=>{p.status=="success"&&(this.cartInfo=p)}}))}clearCart(){this.clearUserCartSub=this._CartService.clearUserCart().subscribe({next:i=>{i.message=="success"&&(this.cartInfo.numOfCartItems=0,this.cartInfo.data=null,this._CartService.cartCount.set(0),this._ToastrService.success("clear All Items was Done \u2639\uFE0F","Fresh Cart"))}})}ngOnDestroy(){this.removeSpecificCartItemSub?.unsubscribe(),this.incCartProductQuantitySub?.unsubscribe(),this.decCartProductQuantitySub?.unsubscribe(),this.clearUserCartSub?.unsubscribe()}};c.\u0275fac=function(t){return new(t||c)},c.\u0275cmp=I({type:c,selectors:[["app-cart"]],standalone:!0,features:[E],decls:3,vars:1,consts:[[1,"container-lg","bg-main-light","rounded-2","shadow","py-4","px-3","my-4"],[1,"d-flex","justify-content-between","align-items-center"],[1,"mb-5","text-main","h4","fw-bolder"],[1,"fw-bold"],[1,"text-main"],[1,"mb-5","d-block","ms-auto","btn","btn-primary","px-3",3,"routerLink"],[1,"row","align-items-center","g-3","mt-2","py-1","border-bottom","border-1"],[1,"btn","btn-danger","px-4","py-2","d-block","ms-auto","my-4",3,"click"],[1,"col-5","col-lg-2"],[3,"src","alt"],[1,"col-6","col-lg-10"],[1,"h6","fw-bolder"],[1,"btn","btn-outline-danger","mt-5",3,"click"],[1,"fa-solid","fa-trash"],[1,"d-flex","align-items-center","gap-3"],[1,"cr",3,"click"],[1,"fa-solid","fa-circle-minus","fa-xl",2,"color","#B197FC"],[1,"fa-solid","fa-circle-plus","fa-xl",2,"color","#B197FC"],[1,"fw-bolder","text-danger","text-uppercase","text-center"]],template:function(t,s){t&1&&(n(0,"section",0),w(1,$,20,8)(2,R,2,0),r()),t&2&&(l(),y(1,s.cartInfo.numOfCartItems!=0?1:2))},dependencies:[V,F,B]});let a=c;return a})();export{J as CartComponent};
