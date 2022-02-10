import { mount as basketBadgeMount } from "basketBadge/Module";
import { mount as basketCardMount } from "basketCard/Module";
import { mount as productListMount } from "productList/Module";
import { mount as trackingMount } from "tracking/Module";

basketBadgeMount('basket-badge');
basketCardMount('basket-card');
productListMount('product-list');
trackingMount();
