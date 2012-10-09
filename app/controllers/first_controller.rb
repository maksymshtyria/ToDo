class FirstController < ApplicationController

	layout 'application'

  	def my
  		render :template =>'first/first'
  	end

  	def show
  		render :json => Todo.all
  	end

  	def create
  		todoRow = Todo.new( :project => params[:project], :title => params[:title], :done => params[:done], :order => params[:order] )
  		if todoRow.save
  			render :json => todoRow and return
        #render :json => params and return
		  end
  	end

  	def getProjects
  		render :json => Todo.select(:project).uniq and return
  	end

    def getProject
      render :json => Todo.where(:project => params[:name]) and return
    end

    def dropProject
      Todo.destroy_all(:project => params[:name])
      render :json => { :status => 200 } and return
    end

    def updateTask
      Todo.update(params[:id], :title => params[:title], :done => params[:done])
        #render :json => Todo.where(:id => params[:id]) and return
        render :json => params and return
    end

    def deleteTask
      Todo.delete(params[:id])
      render :json => {:dd => 222} and return
    end
end
