using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntities
    {
        private readonly StoreContext _context;
        public GenericRepository(StoreContext context)
        {
            this._context = context;

        }

        public async Task<int> CountAsync(ISpecification<T> spec)
        {
            return await ApplySecification(spec).CountAsync();
        }       

        public async Task<T> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<T> GetEntityWithSpec(ISpecification<T> spec)
        {
            return await ApplySecification(spec).FirstOrDefaultAsync();
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec)
        {
            return await ApplySecification(spec).ToListAsync();
        }
        
        private IQueryable<T> ApplySecification(ISpecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
        }

        public void Update(T entity)
        {
            _context.Set<T>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(T entity)
        {
               _context.Set<T>().Remove(entity);
        }

        public void Add(T entity)
        {
           _context.Set<T>().Add(entity);
        }

    }
}