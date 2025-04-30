/* @odoo-module */


import {registry} from '@web/core/registry';
import {kanbanView} from '@web/views/kanban/kanban_view';
import {KanbanController} from '@web/views/kanban/kanban_controller';
import {useService}  from '@web/core/utils/hooks'
import {useState,onWillStart}  from '@odoo/owl'

export class ResPartnerKanbanInheritance extends KanbanController {
    setup(){
        super.setup()
        this.orm = useService('orm')
        this.action = useService('action')

        this.state = useState({
            locationInfo : [],

        })




        onWillStart(async ()=>{
            this.state.locationInfo = await this.orm.readGroup('res.partner',[],['state_id'],['state_id'])

        })



    }




    ifEmptySearch(e){
        if(e.target.value == ''){
            setTimeout(()=>{
                this.ternOffStateCheckBox(e)
            },100)
        }
    }



     getSearchLocations(e,loc){
        this.ternOffStateCheckBox(e)
        const name = loc.state_id[1] || 'No State';
        const id = loc.state_id[0] || false;
        setTimeout(()=>{
            this.clearSearch()
        },200)


        if(e.target.checked){
            setTimeout(()=>{
                   this.env.searchModel.createNewFilters([{
                    description:name,
                    domain:[['state_id','=',id]],
                   }])
            } , 200)
            
        }

     }






    clearSearch() {
            const filtersToClear = this.env.searchModel.getSearchItems().filter(item=> item.isActive && item.type == 'filter')
            filtersToClear.forEach(item => this.env.searchModel.toggleSearchItem(item.id))
    }



    ternOffStateCheckBox(e){
        const inputs = document.querySelectorAll('.call-state')


        inputs.forEach(el=>{
            if(el.dataset.state != e.target.dataset.state ){
                el.checked = false

            }
        })
    }



}




ResPartnerKanbanInheritance.template = "web.KanbanView_inheritance";
export const resPartnerKanbanInheritance = {
    ...kanbanView,
    Controller:ResPartnerKanbanInheritance
}




registry.category('views').add('res_partner_kanban_inheritance_js',resPartnerKanbanInheritance)





//export class ResPartnerKanbanController extends KanbanController{
//import {registry} from '@web/core/registry';
//import {kanbanView} from '@web/views/kanban/kanban_view';
//import {KanbanController} from '@web/views/kanban/kanban_controller';
//import {useService} from '@web/core/utils/hooks';
//const {useState, onWillStart} = owl
//
//    setup(){
//        super.setup()
//        this.action = useService('action')
//        this.orm = useService('orm')
//        this.state = useState({
//            value:1
//        })
//
//
//        onWillStart(async ()=>{
//                this.customerLocations = await this.orm.readGroup('res.partner' , [] ,['state_id'],['state_id'])
////             this.customerLocations = await this.orm.readGroup('res.partner',[],['state_id'],['state_id'])
//
//
//        })
//
//
//
//    }
//
//
//        selectLocation(cust){
//            const name = cust[1] || 'No State';
//            const id = cust[0] || false;
//
//            this.env.searchModel.createNewFilters([
//            {
//                description:name,
//                domain:[['state_id','=',id]],
//
//            }
//            ])
//
//
//        }
//
//
//
//
//
//
//    getOrders(){
//
//        this.action.doAction({
//            'type':'ir.actions.act_window',
//            'name':'orders',
//            'res_model':'sale.order',
//            'views':[[false,'list'],[false,'form']],
//        })
//    }
//
//}
//
//
//ResPartnerKanbanController.template = 'web.KanbanView_inheritance'
//export const resPartnerKanbanController = {
//    ...kanbanView,
//    Controller:ResPartnerKanbanController,
//    buttonTemplate:'web.KanbanView.Buttons.inheritance'
//}
//
//
//registry.category("views").add("res_partner_kanban_view_controller", resPartnerKanbanController)