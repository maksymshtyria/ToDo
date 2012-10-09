class Todo < ActiveRecord::Base
  attr_accessible :done, :order, :project, :title
end
