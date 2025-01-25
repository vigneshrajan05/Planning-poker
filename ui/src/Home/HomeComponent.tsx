import PlanComponent from "./PlanComponent"
import { UserListComponent } from "./UserListComponent"

export const HomeComponent = () => {
  return (
    <div style={{paddingTop: '48px', paddingLeft: 0}}>
      <UserListComponent userList={[{displayName: 'Vignesh M', score: 3}, {displayName: 'Vignesh L', score: 5}]}/>
       <div style={{ alignItems: 'flex-end' }} >
        <PlanComponent />
      </div >
    </div>
  )
}
